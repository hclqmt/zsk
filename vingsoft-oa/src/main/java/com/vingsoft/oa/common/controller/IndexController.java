package com.vingsoft.oa.common.controller;

import com.vingsoft.core.response.LayuiResponse;
import com.vingsoft.oa.common.LoginUser;
import com.vingsoft.oa.common.base.BaseController;
import com.vingsoft.oa.open.doc.entity.DocKnowledge;
import com.vingsoft.oa.open.doc.entity.SysUser;
import com.vingsoft.oa.open.doc.service.DocKnowledgeService;
import com.vingsoft.utils.ObjectKit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;

/**
 * @Auther: hcl
 * @Date: 2020/5/31 19:32
 * @Description:
 */
@Controller
@RequestMapping("/openIndex")
public class IndexController extends BaseController {
    private String PREFIX = "/open/";

    @Autowired
    private DocKnowledgeService docKnowledgeService;

    @RequestMapping("")
    public ModelAndView index(Model model,String prevUrl) {
        mav.setViewName(PREFIX+"index2");
        model.addAttribute("loginUser", LoginUser.getInstance());  // 登录用户信息
        model.addAttribute("prevUrl", prevUrl);  // 保存登录前跳转信息
        return mav;
    }

    @GetMapping("/main")
    public ModelAndView main() {
        mav.setViewName("redirect:/doc/knowledge/getKnowledgeClassify");
        return mav;
    }
    @GetMapping("/pageIndex")
    public String pageIndex(DocKnowledge docKnowledge, Model model) {
        LayuiResponse docKnowledgeList = docKnowledgeService.findPage(docKnowledge);
        model.addAttribute("docClassify",docKnowledge.getDocClassify());
        model.addAttribute("docKnowledgeList",docKnowledgeList);
        return "/open/doc/knowledge/pageIndex";
    }
    @GetMapping("/list")
    public ModelAndView list(DocKnowledge docKnowledge) throws IOException {
        LayuiResponse docKnowledgeList = docKnowledgeService.findPage(docKnowledge);
        SysUser sysUser = LoginUser.getInstance();
        if(ObjectKit.isNotNull(sysUser)){
            mav.addObject("userId", sysUser.getId());
        }else{
            mav.addObject("userId","-1");
        }
        mav.setViewName("/open/doc/knowledge/list");
        mav.addObject("docKnowledgeList",docKnowledgeList);
        mav.addObject("docClassify",docKnowledge.getDocClassify());
        return mav;
    }


}

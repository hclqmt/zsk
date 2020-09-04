package com.vingsoft.oa.open.doc.controller;


import com.alibaba.fastjson.JSONObject;
import com.vingsoft.core.response.LayuiResponse;
import com.vingsoft.core.response.SimpleResponse;
import com.vingsoft.oa.common.LoginUser;
import com.vingsoft.oa.common.base.BaseController;
import com.vingsoft.oa.config.beetl.ConfCount;
import com.vingsoft.oa.open.doc.entity.*;
import com.vingsoft.oa.open.doc.service.*;
import com.vingsoft.utils.ObjectKit;
import com.vingsoft.utils.RedisUtils;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/doc/praise")
public class KnowledgePraiseController extends BaseController {

    private String PREFIX="/open/doc/praise/";

    @Autowired
    private DocKnowledgeService docKnowledgeService;
    
    @Autowired
    private KnowledgePraiseService knowledgePraiseService;

    @Autowired
    private PraiseSysUserService praiseSysUserService;

    @Autowired
    private PraiseReplyService praiseReplyService;

    @Autowired
    private RedisUtils redisUtils;

    @Autowired
    private KnowledgeSysUserService knowledgeSysUserService;

    @GetMapping("/praiseList")
    public ModelAndView list(KnowledgePraise knowledgePraise,String docClassify) {
        SysUser user = LoginUser.getInstance();
        DocKnowledge docKnowledge = docKnowledgeService.findByUuid(knowledgePraise.getKnowledgeUuid());
        if(user!=null&&!"".equals(user)){
            mav.addObject("userId", user.getId());
            //判断用户是否点赞此知识/文件
            Integer praiseNum = praiseSysUserService.findCount(docKnowledge.getUuid(),Long.valueOf(user.getId()));
            if(praiseNum>0){
                mav.addObject("isPraise",1);
            }else{
                mav.addObject("isPraise",0);
            }
        }else{
            mav.addObject("user",user);
            mav.addObject("userId", -1);
            mav.addObject("isPraise",0);
        }
        mav.addObject("docKnowledge", docKnowledge);
        String locations = docKnowledgeService.getLocationByDocClassify(docClassify);
        mav.addObject("locations",locations);
        //获得同类知识
        List<DocKnowledge> theSameDocKnowledgeList = docKnowledgeService.findByDocClassify(docClassify,docKnowledge.getUuid(),docKnowledge.getIsWordResource());
        mav.addObject("theSameDocKnowledgeList",theSameDocKnowledgeList);
        //推荐知识
        List<DocKnowledge> theRecommendSDocKnowledgeList = docKnowledgeService.findByDocValue(docKnowledge.getUuid());
        mav.addObject("theRecommendSDocKnowledgeList",theRecommendSDocKnowledgeList);
        //获得评论数
        int praiseCount = knowledgePraiseService.findCountByKnowledgeUuid(docKnowledge.getUuid());
        mav.addObject("praiseCount",praiseCount);
        LayuiResponse knowledgePraiseList = knowledgePraiseService.findPage(knowledgePraise);
        mav.addObject("knowledgePraiseList",knowledgePraiseList);
        mav.setViewName(PREFIX+"praise_list");
        return mav;
    }

    @PostMapping("/add")
    @ResponseBody
    public SimpleResponse add(KnowledgePraise knowledgePraise, BindingResult errors) throws JSONException {
        SimpleResponse response = validErrors(errors);
        knowledgePraise.setNickname(LoginUser.getInstance().getNickname());
        knowledgePraise.setKnowledgeCreateById(Long.valueOf(docKnowledgeService.findByUuid(knowledgePraise.getKnowledgeUuid()).getCreateById()));
        knowledgePraise.setCreateDate(new Date());
        String key = "knowledgePraiseList"+"::"+knowledgePraise.getUserId();
        try{
            redisUtils.lSet(key,knowledgePraise);
            redisUtils.lSet("knowledgePraiseList", redisUtils.lPop(key));
            if(knowledgePraiseService.save(knowledgePraise)) {
                response = new SimpleResponse(1,"评论成功",200);
                response.setContent(knowledgePraise);
            }else {
                response = new SimpleResponse(0,"评论失败,请稍后再试",400);
            }
            return response;
        }catch (Exception e){
            return new SimpleResponse("添加失败,请稍后再试");
        }

    }

    @PostMapping("/list")
    public String list(KnowledgePraise knowledgePraise, Model model,String ids,Integer lastId) {
        System.out.println(lastId);
        SysUser user = LoginUser.getInstance();

//        if(ObjectKit.isNotNull(ids)){
//            knowledgePraise.setPraiseIds(ids);
//        }
        knowledgePraise.setLastId(lastId);
        if (ObjectKit.isNotNull(user)){
            model.addAttribute("userId",user.getId());
            model.addAttribute("userName",user.getNickname());
        }else {
            model.addAttribute("userId","");
            model.addAttribute("userName","");
        }
        LayuiResponse knowledgePraiseList = knowledgePraiseService.findPage(knowledgePraise);
        List<Object> data = knowledgePraiseList.getData();
        for (Object praise:data){
            KnowledgePraise knowledgePraise1 =(KnowledgePraise)praise;
            knowledgePraise1.setPraiseReplyList(praiseReplyService.findList(knowledgePraise1.getId()));
        }
        ConfCount confCount = new ConfCount();
        String s = confCount.BeetlString(knowledgePraiseList.getTotalPage().toString());
        model.addAttribute("knowledgePraiseList",knowledgePraiseList);
        model.addAttribute("confTotalPage", s);
        return PREFIX+"list";
    }

    @PostMapping("/addReply")
    @ResponseBody
    public SimpleResponse addReply(PraiseReply praiseReply,String receiverName, BindingResult errors) throws JSONException {
        SimpleResponse response = validErrors(errors);
        JSONObject jsonObject = new JSONObject();
        SysUser user = LoginUser.getInstance();
        praiseReply.setSenderId(user.getId());
        praiseReply.setSenderName(user.getNickname());
        praiseReply.setCreateDate(new Date());
        SimpleDateFormat sdf =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        jsonObject.put("time",sdf.format(praiseReply.getCreateDate()));
        try{
            if(praiseReplyService.save(praiseReply)) {
                int praiseCount = praiseReplyService.findCountByPraiseId(praiseReply.getPraiseId());
                response = new SimpleResponse(1,"回复成功",200);
                jsonObject.put("praiseReply",praiseReply);
                response.setJsonObject(jsonObject);
            }else {
                response = new SimpleResponse("回复失败,请稍后再试");
            }
            return response;
        }catch (Exception e){
            return new SimpleResponse("回复失败,请稍后再试");
        }

    }

    /**
     * 评论赞同反对
     * @param praiseId
     * @param type
     * @return
     */
    @PostMapping("/praiseOrOppo")
    @ResponseBody
    public SimpleResponse praiseOrOppo(String praiseId,String type){
        KnowledgePraise knowledgePraise = knowledgePraiseService.findByPraiseId(Long.valueOf(praiseId));
        String msg = "操作失败";
        int content=0;
        SysUser sysUser = LoginUser.getInstance();
        SimpleResponse response = new SimpleResponse();
        try {
            if(!ObjectKit.isNotNull(sysUser)){
                msg = "请先登录,再操作";
                return  new SimpleResponse(msg);
            }

            int goodCount = knowledgeSysUserService.findCount(Long.valueOf(praiseId),Long.valueOf(sysUser.getId()),3);
            KnowledgeSysUser knowledgeSysUserGood = knowledgeSysUserService.findByOther(Long.valueOf(praiseId), Long.valueOf(sysUser.getId()), 3);
            int badCount = knowledgeSysUserService.findCount(Long.valueOf(praiseId),Long.valueOf(sysUser.getId()),4);
            KnowledgeSysUser knowledgeSysUserBad = knowledgeSysUserService.findByOther(Long.valueOf(praiseId), Long.valueOf(sysUser.getId()), 4);
            //好评
            if("0".equals(type)){
                KnowledgeSysUser knowledgeSysUser = new KnowledgeSysUser();
                knowledgeSysUser.setType(3);
                knowledgeSysUser.setKnowledgeUuid(Long.valueOf(praiseId));
                knowledgeSysUser.setUserId(Long.valueOf(sysUser.getId()));
                content = knowledgePraise.getPraiseNum();
                if(goodCount<1&&badCount<1){
                    content=content+1;
                    knowledgePraise.setPraiseNum(content);
                    knowledgeSysUserService.save(knowledgeSysUser);
                    knowledgePraiseService.update(knowledgePraise);
                }else if(goodCount<1&&badCount>=1){
                    content=content+1;
                    knowledgePraise.setPraiseNum(content);
                    knowledgePraise.setOppositionNum(knowledgePraise.getOppositionNum()-1);
                    knowledgeSysUserService.save(knowledgeSysUser);
                    knowledgeSysUserService.deleteByType(knowledgeSysUserBad);
                    knowledgePraiseService.update(knowledgePraise);
                }else{

                }


                response = new SimpleResponse(1,"谢谢",200,knowledgePraiseService.findByPraiseId(Long.valueOf(praiseId)));

            }else if("1".equals(type)){//差评
                content = knowledgePraise.getOppositionNum();
                KnowledgeSysUser knowledgeSysUser = new KnowledgeSysUser();
                knowledgeSysUser.setType(4);
                knowledgeSysUser.setKnowledgeUuid(Long.valueOf(praiseId));
                knowledgeSysUser.setUserId(Long.valueOf(sysUser.getId()));
                if(badCount<1&&goodCount<1){
                    content = content+1;
                    knowledgePraise.setOppositionNum(content);
                    knowledgeSysUserService.save(knowledgeSysUser);
                    knowledgePraiseService.update(knowledgePraise);
                }else if(badCount<1&&goodCount>=1){
                    content = content+1;
                    knowledgePraise.setPraiseNum(knowledgePraise.getPraiseNum()-1);
                    knowledgePraise.setOppositionNum(content);
                    knowledgeSysUserService.save(knowledgeSysUser);
                    knowledgeSysUserService.deleteByType(knowledgeSysUserGood);
                    knowledgePraiseService.update(knowledgePraise);
                }else{

                }


                response = new SimpleResponse(0,"很抱歉",200,knowledgePraiseService.findByPraiseId(Long.valueOf(praiseId)));

            }

            return response;

        }catch (Exception e){
            return new SimpleResponse(0,msg);
        }



    }

}

package com.vingsoft.oa.open.doc.controller;

import com.alibaba.fastjson.JSONObject;
import com.vingsoft.common.properties.SystemProperties;
import com.vingsoft.core.response.LayuiResponse;
import com.vingsoft.core.response.SimpleResponse;
import com.vingsoft.ikanalyzer.utils.LuceneIKUtil;
import com.vingsoft.ikanalyzer.utils.LuceneProperties;
import com.vingsoft.oa.common.LoginUser;
import com.vingsoft.oa.common.base.BaseController;
import com.vingsoft.oa.open.doc.entity.*;
import com.vingsoft.oa.open.doc.service.*;
import com.vingsoft.utils.*;
import org.apache.commons.lang.StringUtils;
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

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @Auther: hcl
 * @Date: 2020/6/22 14:22
 * @Description:
 */
@Controller
@RequestMapping("/doc/sysUser")
public class SysUserController extends BaseController {
    private String PREFIX="/open/doc/sysUser/";
    @Autowired
    private DocKnowledgeService docKnowledgeService;

    @Autowired
    private RedisUtils redisUtils;

    @Autowired
    private SystemProperties systemProperties;

    @Autowired
    private KnowledgePraiseService knowledgePraiseService;

    @Autowired
    private SysUserService sysUserService;

    @Autowired
    private LeaveMessageService leaveMessageService;

    @Autowired
    private LeaveMessageReplyService leaveMessageReplyService;

    @Autowired
    private LeaveSysUserService leaveSysUserService;

    @Autowired
    private KnowledgeKeywordsService knowledgeKeywordsService;

    @Autowired
    private PraiseReplyService praiseReplyService;

    @Autowired
    private LuceneProperties luceneProperties;


    @GetMapping("/sysUserInfo")
    public ModelAndView info(HttpServletRequest request) {
        SysUser sysUser = LoginUser.getInstance();
        if (ObjectKit.isNull(sysUser)){
            String servletPath = request.getServletPath();
            mav.addObject("requestURI",servletPath);
            mav.setViewName("redirect:/login");
            return mav;
        }else{
            mav.setViewName(PREFIX+"sysUserInfo");
        }
        List<Map<String,String>> docCountList = sysUserService.findDocCount(sysUser.getId());
        mav.addObject("docCount",docCountList.get(0));
        mav.addObject("sysUser",sysUser);

        return mav;
    }

    @GetMapping("/getList")
    public ModelAndView list() {
        SysUser sysUser = LoginUser.getInstance();
        mav.addObject("sysUser",sysUser);
        mav.setViewName(PREFIX+"sysUserInfoList");
        return mav;
    }

    @GetMapping("/leaveMessageList")
    public String leaveMessageList(LeaveMessage leaveMessage, Model model, String ids) {
        SysUser user = LoginUser.getInstance();
        if (ObjectKit.isNotNull(user)){
            model.addAttribute("userId",user.getId());
            model.addAttribute("userName",user.getNickname());
        }else {
            model.addAttribute("userId","");
            model.addAttribute("userName","");
        }
        Long leaveTotalPage = leaveMessageService.findPage(leaveMessage).getTotalPage();
        model.addAttribute("leaveTotalPage", leaveTotalPage);
        return PREFIX+"leaveMessageList";
    }

    @PostMapping("/leaveList")
    public String leaveList(LeaveMessage leaveMessage, Model model, String ids) {
        SysUser user = LoginUser.getInstance();
        if (ObjectKit.isNotNull(user)){
            model.addAttribute("userId",user.getId());
            model.addAttribute("userName",user.getNickname());
        }else {
            model.addAttribute("userId","");
            model.addAttribute("userName","");
        }
        LayuiResponse leaveMessageList = leaveMessageService.findPage(leaveMessage);
        List<Object> data = leaveMessageList.getData();
        for (Object leave:data){
            LeaveMessage leaveMessage1 =(LeaveMessage)leave;
            leaveMessage1.setLeaveMessageReplyList(leaveMessageReplyService.findList(leaveMessage1.getId()));
        }
        model.addAttribute("leaveMessageList",leaveMessageList);
        return PREFIX+"leaveList";
    }

    @GetMapping("/myKnowledgePageAjax")
    public String myKnowledgePageAjax(DocKnowledge docKnowledge, Model model) {
        LayuiResponse docKnowledgeList=new LayuiResponse();
        if(ObjectKit.isNotNull(docKnowledge)){
            if(StringUtils.isNotBlank(docKnowledge.getDocType())){
                docKnowledgeList = docKnowledgeService.findPage(docKnowledge);
            }else{
                docKnowledgeList = docKnowledgeService.findPageByMe(docKnowledge);
            }
        }

        model.addAttribute("docType",docKnowledge.getDocType());
        model.addAttribute("type",docKnowledge.getType());
        model.addAttribute("docKnowledgeList",docKnowledgeList);
        model.addAttribute("sysUser", LoginUser.getInstance());
        return PREFIX+"knowledge/myKnowledgeList";
    }
    @GetMapping("/myKnowledgePage")
    public String myKnowledgePage(DocKnowledge docKnowledge,Model model){
        LayuiResponse docKnowledgeList=new LayuiResponse();
        if(ObjectKit.isNotNull(docKnowledge)){
            if(StringUtils.isNotBlank(docKnowledge.getDocType())){
                docKnowledgeList = docKnowledgeService.findPage(docKnowledge);
            }else{
                docKnowledgeList = docKnowledgeService.findPageByMe(docKnowledge);
            }
        }
        model.addAttribute("docKnowledgeList",docKnowledgeList);
        model.addAttribute("type",docKnowledge.getType());
        model.addAttribute("docType",docKnowledge.getDocType());
        return PREFIX+"knowledge/myKnowledgePage";
    }

    @GetMapping("/myInfoListPageAjax")
    public String myInfoListPageAjax(MyInfoEntity myInfoEntity, Model model){
        List<MyInfoEntity> myInfoList = sysUserService.myInfoList(myInfoEntity);
        Integer myInfoCount = sysUserService.findMyInfoCount(myInfoEntity.getReceiverId());
        model.addAttribute("count",myInfoCount);
        model.addAttribute("myInfoList",myInfoList);
        model.addAttribute("sysUser",LoginUser.getInstance());
        return PREFIX+"myInfo/myInfoList";
    }

    @GetMapping("/myInfoListPage")
    public String myInfoListPage(MyInfoEntity myInfoEntity, Model model){
        List<MyInfoEntity> myInfoList = sysUserService.myInfoList(myInfoEntity);
        model.addAttribute("myInfoList",myInfoList);
        model.addAttribute("sysUser",LoginUser.getInstance());
        return PREFIX+"myInfo/myInfoPage";
    }

    /**
     * 留言赞同反对
     * @param praiseId
     * @param type
     * @return
     */
    @PostMapping("/leaveOrOppo")
    @ResponseBody
    public SimpleResponse praiseOrOppo(String praiseId, String type){
        LeaveMessage leaveMessage = leaveMessageService.findByLeaveId(Integer.valueOf(praiseId));
        String msg = "操作失败";
        int content=0;
        SysUser sysUser = LoginUser.getInstance();
        SimpleResponse response = new SimpleResponse();
        try {
            if(!ObjectKit.isNotNull(sysUser)){
                msg = "请先登录,再操作";
                return  new SimpleResponse(msg);
            }

            int goodCount = leaveSysUserService.findCount(Long.valueOf(praiseId),Long.valueOf(sysUser.getId()),0);
            LeaveSysUser leaveSysUserGood = leaveSysUserService.findByOther(Long.valueOf(praiseId), Long.valueOf(sysUser.getId()), 0);
            int badCount = leaveSysUserService.findCount(Long.valueOf(praiseId),Long.valueOf(sysUser.getId()),1);
            LeaveSysUser leaveSysUserBad = leaveSysUserService.findByOther(Long.valueOf(praiseId), Long.valueOf(sysUser.getId()), 1);
            //好评
            if("0".equals(type)){
                LeaveSysUser leaveSysUser = new LeaveSysUser();
                leaveSysUser.setType(0);
                leaveSysUser.setLeaveMessageId(Long.valueOf(praiseId));
                leaveSysUser.setUserId(Long.valueOf(sysUser.getId()));
                content = leaveMessage.getPraiseNum();
                if(goodCount<1&&badCount<1){
                    content=content+1;
                    leaveMessage.setPraiseNum(content);
                    leaveSysUserService.save(leaveSysUser);
                    leaveMessageService.update(leaveMessage);
                }else if(goodCount<1&&badCount>=1){
                    content=content+1;
                    leaveMessage.setPraiseNum(content);
                    leaveMessage.setOppositionNum(leaveMessage.getOppositionNum()-1);
                    leaveSysUserService.save(leaveSysUser);
                    leaveSysUserService.deleteByType(leaveSysUserBad);
                    leaveMessageService.update(leaveMessage);
                }else{

                }


                response = new SimpleResponse(1,"谢谢",200,leaveMessageService.findByLeaveId(Integer.valueOf(praiseId)));

            }else if("1".equals(type)){//差评
                content = leaveMessage.getOppositionNum();
                LeaveSysUser leaveSysUser = new LeaveSysUser();
                leaveSysUser.setType(1);
                leaveSysUser.setLeaveMessageId(Long.valueOf(praiseId));
                leaveSysUser.setUserId(Long.valueOf(sysUser.getId()));
                if(badCount<1&&goodCount<1){
                    content = content+1;
                    leaveMessage.setOppositionNum(content);
                    leaveSysUserService.save(leaveSysUser);
                    leaveMessageService.update(leaveMessage);
                }else if(badCount<1&&goodCount>=1){
                    content = content+1;
                    leaveMessage.setPraiseNum(leaveMessage.getPraiseNum()-1);
                    leaveMessage.setOppositionNum(content);
                    leaveSysUserService.save(leaveSysUser);
                    leaveSysUserService.deleteByType(leaveSysUserGood);
                    leaveMessageService.update(leaveMessage);
                }else{

                }


                response = new SimpleResponse(0,"很抱歉",200,leaveMessageService.findByLeaveId(Integer.valueOf(praiseId)));

            }

            return response;

        }catch (Exception e){
            return new SimpleResponse(0,msg);
        }



    }
    @PostMapping("/addReply")
    @ResponseBody
    public SimpleResponse addReply(LeaveMessageReply leaveMessageReply,String receiverName, BindingResult errors) throws JSONException {
        SimpleResponse response = validErrors(errors);
        JSONObject jsonObject = new JSONObject();
        SysUser user = LoginUser.getInstance();
        leaveMessageReply.setSenderId(user.getId());
        leaveMessageReply.setSenderName(user.getNickname());
        leaveMessageReply.setCreateDate(new Date());
        SimpleDateFormat sdf =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        jsonObject.put("time",sdf.format(leaveMessageReply.getCreateDate()));
        try{
            if(leaveMessageReplyService.save(leaveMessageReply)) {
                int praiseCount = leaveMessageReplyService.findCountByLeaveMessageId(leaveMessageReply.getLeaveMessageId());
                response = new SimpleResponse(1,"回复成功",200);
                jsonObject.put("leaveMessageReply",leaveMessageReply);
                response.setJsonObject(jsonObject);
            }else {
                response = new SimpleResponse("回复失败,请稍后再试");
            }
            return response;
        }catch (Exception e){
            return new SimpleResponse("回复失败,请稍后再试");
        }

    }

    @GetMapping("/myPraiseListPageAjax")
    public String myPraiseListPageAjax(KnowledgePraise knowledgePraise, Model model){
        LayuiResponse page = knowledgePraiseService.findPageMyPraise(knowledgePraise);
        model.addAttribute("count",page.getCount());
        model.addAttribute("myPraiseList",page.getData());
        model.addAttribute("sysUser",LoginUser.getInstance());
        return PREFIX+"knowledgePraise/myPraiseList";
    }


    /**
     * 知识评论
     * @param knowledgePraise
     * @param model
     * @return
     */
    @GetMapping("/myPraiseListPage")
    public String myPraiseListPage(KnowledgePraise knowledgePraise, Model model){
        LayuiResponse page = knowledgePraiseService.findPageMyPraise(knowledgePraise);
        model.addAttribute("myPraiseList",page.getData());
        model.addAttribute("sysUser",LoginUser.getInstance());
        return PREFIX+"knowledgePraise/myPraisePage";
    }
    /**
     * 知识评论
     * @param sysUser
     * @param model
     * @return
     */
    @GetMapping("/updateMyInfo")
    public String updateMyInfo(SysUser sysUser, Model model){
        model.addAttribute("sysUser",LoginUser.getInstance());
        return PREFIX+"updateMyInfo/updateMyInfo";
    }

    @PostMapping("/updateInfo")
    @ResponseBody
    public SimpleResponse updateInfo(@Valid SysUser sysUser, BindingResult errors) throws JSONException {
        SimpleResponse response = validErrors(errors);
        SysUser instance = LoginUser.getInstance();
        try{
//            instance.setNickname(sysUser.getUsername());
//            instance.setUsername(sysUser.getUsername());
//            instance.setIcon(sysUser.getIcon());
//            instance.setUpdateDate(new Date());
//            instance.setEmail(sysUser.getEmail());
            sysUser.setUpdateDate(new Date());
            sysUser.setNickname(sysUser.getUsername());
            UpdateSysUser.setUser(sysUser);
            if(sysUserService.updateTemplate(sysUser)) {
                response = new SimpleResponse(1,"修改成功",200);
            }else {
                response = new SimpleResponse(0,"修改失败",500);
            }
            return response;
        }catch (Exception e){
            return new SimpleResponse(0,"修改失败",500);
        }

    }
    @GetMapping("/updateMyPassword")
    public String updateMyPassword(SysUser sysUser, Model model){
        return PREFIX+"updateMyInfo/updateMyPassword";
    }
    @PostMapping("/updatePassword")
    @ResponseBody
    public SimpleResponse updatePassword(String password,String newPassword,String oldPassword,SysUser sysUsers, BindingResult errors) throws JSONException {
        SimpleResponse response = validErrors(errors);
        SysUser instance = LoginUser.getInstance();
        try{

            if (StringUtil.isBlank(newPassword, password,oldPassword)) {
                return new SimpleResponse(0,"密码不能为空",500);
            }
            if (!MD5Kit.getPasswordByMd5(oldPassword).equals(instance.getPassword())){
                return new SimpleResponse(0,"当前密码不正确",500);
            }
            if (password.equals(oldPassword)){
                return new SimpleResponse(0,"新的密码不能与上一次相同",500);
            }
            if (password.length()<6){
                return new SimpleResponse(0,"密码不能少于6位",500);
            }
            if(!password.equals(newPassword)){
                return new SimpleResponse(0,"两次密码不一致",500);
            }
            instance.setPassword(MD5Kit.getPasswordByMd5(password));
            instance.setUpdateDate(new Date());
            if(sysUserService.update(instance)) {
                response = new SimpleResponse(1,"修改成功",200);
            }else {
                response = new SimpleResponse("修改失败");
            }
            return response;
        }catch (Exception e){
            return new SimpleResponse("修改失败");
        }

    }


    /**
     * 首页模糊查询
     * @param keyWords
     * @param page
     * @param limit
     * @param model
     * @return
     */
    @GetMapping("/open/searchAjax")
    public String searchAjax(String keyWords,Long page,Long limit,Model model){
        SysUser sysUser = LoginUser.getInstance();
        if (ObjectKit.isNotNull(sysUser)){
            //报存每次查询的关键字放进redis中
            String key = RedisKeyUtils.getRuleKey(sysUser.getId().toString(), System.currentTimeMillis()+"","keyWords");
        }else{

        }
        List<DocKnowledge> docKnowledgeList = sysUserService.getDocKnowledgeList(keyWords, page, limit);
        Long docKnowledgeCount = sysUserService.getDocKnowledgeCount(keyWords);
        model.addAttribute("docKnowledgeList",docKnowledgeList);
        model.addAttribute("count",docKnowledgeCount);
        model.addAttribute("keyWords",keyWords);

        return PREFIX+"search/singleSearchList";
    }
    @GetMapping("/open/searchPage")
    public String searchPage(String keyWords,Long page,Long limit,Model model){
        List<DocKnowledge> docKnowledgeList = sysUserService.getDocKnowledgeList(keyWords, page, limit);
        model.addAttribute("docKnowledgeList",docKnowledgeList);
        return PREFIX+"search/singleSearchPage";
    }

    @GetMapping("/open/searchByLucene")
    public String searchBylucene(String keyWords,Model model,Integer page,Integer limit){
        LuceneIKUtil luceneProcess = new LuceneIKUtil(luceneProperties.getUrl());
        String [] fields = {"knowledgeName","knowledgeContent","createDate"};
        List<DocKnowledge> list = luceneProcess.search(fields, keyWords, page, limit);
        Integer totalCount = 0;
        if (ObjectKit.isNotNull(list)&&list.size()>0){
            totalCount =  list.get(0).getCountLucene();
        }
        KnowledgeKeywords knowledgeKeywords = new KnowledgeKeywords();
        knowledgeKeywords.setPage(1);
        knowledgeKeywords.setLimit(10);
        LayuiResponse page1 = knowledgeKeywordsService.findPage(knowledgeKeywords);
        model.addAttribute("knowledgeKeywordsList",page1.getData());
        model.addAttribute("docKnowledgeList",list);
        model.addAttribute("count",totalCount);
        model.addAttribute("keyWords",keyWords);
        return PREFIX+"search/singleSearchList";
    }

    @GetMapping("/open/searchPageByLucene")
    public String searchPage(String keyWords,Integer page,Integer limit,Model model){
        LuceneIKUtil luceneProcess = new LuceneIKUtil(luceneProperties.getUrl());
        String [] fields = {"knowledgeName","knowledgeContent","createDate"};
        List<DocKnowledge> list = luceneProcess.search(fields, keyWords, page, limit);
        model.addAttribute("docKnowledgeList",list);
        return PREFIX+"search/singleSearchPage";
    }


    @GetMapping("/showInfo")
    public String showInfo(Integer id,String type,String title,Model model){
        model.addAttribute("title",title);
        model.addAttribute("type",type);
        if("1".equals(type)){
            PraiseReply byPraiseId = praiseReplyService.findByPraiseId(Long.valueOf(id));
            byPraiseId.setStatus(0);
            praiseReplyService.update(byPraiseId);
            DocKnowledge docKnowledge = docKnowledgeService.findByUuid(knowledgePraiseService.findByPraiseId(byPraiseId.getPraiseId()).getKnowledgeUuid());
            model.addAttribute("docKnowledge",docKnowledge);
            model.addAttribute("message",byPraiseId);

        }else if("2".equals(type)){
            LeaveMessage byLeaveId = leaveMessageService.findByLeaveId(id);
            byLeaveId.setStatus(0);
            leaveMessageService.update(byLeaveId);
            model.addAttribute("message",byLeaveId);
        }else if ("3".equals(type)){
            LeaveMessageReply byLeaveId = leaveMessageReplyService.findByLeaveId(id);
            byLeaveId.setStatus(0);
            leaveMessageReplyService.update(byLeaveId);
            model.addAttribute("message",byLeaveId);
        }else {
            KnowledgePraise byPraiseId = knowledgePraiseService.findByPraiseId(Long.valueOf(id));
            byPraiseId.setStatus(0);
            knowledgePraiseService.update(byPraiseId);
            DocKnowledge docKnowledge = docKnowledgeService.findByUuid(byPraiseId.getKnowledgeUuid());
            model.addAttribute("docKnowledge",docKnowledge);
            model.addAttribute("message",byPraiseId);
        }
        return PREFIX+"myInfo/showInfo";
    }


}

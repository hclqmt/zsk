package com.vingsoft.oa.open.doc.controller;//package com.vingsoft.oa.open.doc.controller;

import com.alibaba.fastjson.JSON;
import com.vingsoft.common.JsonResult;
import com.vingsoft.common.node.DTreeNode;
import com.vingsoft.common.properties.SystemProperties;
import com.vingsoft.core.response.LayuiResponse;
import com.vingsoft.core.response.SimpleResponse;
import com.vingsoft.fileManage.core.FileManage;
import com.vingsoft.fileManager.client.FileInfo;
import com.vingsoft.ikanalyzer.utils.LuceneIKUtil;
import com.vingsoft.ikanalyzer.utils.LuceneProperties;
import com.vingsoft.oa.common.LoginUser;
import com.vingsoft.oa.common.base.BaseController;
import com.vingsoft.oa.open.doc.entity.*;
import com.vingsoft.oa.open.doc.service.*;
import com.vingsoft.utils.*;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang.StringUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 文档知识
 */
@RestController
@RequestMapping("/doc/knowledge")
@Transactional
public class DocKnowledgeController extends BaseController {

	private  static  boolean FLAG = true;
	private static String version="0xx00";
	private String PREFIX="/open/doc/knowledge/";
	@Autowired
	private DocKnowledgeService docKnowledgeService;
	@Autowired
	private SystemProperties systemProperties;

	@Autowired
	private SysDictService sysDictService;

	@Autowired
	private KnowledgeSysUserService knowledgeSysUserService;

	@Autowired
	private PicResourcesService picResourcesService;

	@Autowired
	private PraiseSysUserService praiseSysUserService;

	@Autowired
	private RedisUtils redisUtils;

	@Autowired
	private KnowledgePraiseService knowledgePraiseService;

	@Autowired
	private KnowledgeKeywordsService knowledgeKeywordsService;

	@Autowired
	private KnowledgeClassifyService knowledgeClassifyService;

	@Autowired
	private LuceneProperties luceneProperties;

	@Autowired
	private KnowledgeAttentionSysUserService knowledgeAttentionSysUserService;

	@Autowired
	private FileManage fileManage;

	@GetMapping("/docList")
	public ModelAndView list(HttpSession session) {
		mav.setViewName(PREFIX+"doc_list");
		return mav;
	}

	@GetMapping
	@ApiOperation(value="")
	public ModelAndView index() {
		mav.setViewName(PREFIX+"docKnowledge-list");
		return mav;
	}


	@GetMapping("/queryList")
	@ApiOperation(value="查询文档数据")
	public void queryList(DocKnowledge docKnowledge, HttpServletRequest request, HttpServletResponse response) throws IOException {
		LayuiResponse layuiResponse = docKnowledgeService.findPage(docKnowledge);
		returnJson(layuiResponse);
	}
	@GetMapping("/addInfo")
	@ApiOperation(value="添加文档知识页面")
	public ModelAndView addInfo(HttpServletRequest request) {
		SysUser user = LoginUser.getInstance();
		if (ObjectKit.isNotNull(user)){
			mav.setViewName(PREFIX+"knowledge_add");
		}else{
			String servletPath = request.getServletPath();
			mav.addObject("requestURI",servletPath);
			mav.setViewName("redirect:/login");
			return mav;
		}
		List<SysDict> labelList = sysDictService.findAllByType("label");
		mav.addObject("labelList",labelList);
		return mav;
	}
	@GetMapping("/addInfoResource")
	@ApiOperation(value="添加文件知识页面")
	public ModelAndView addInfoResource(HttpServletRequest request) {
		SysUser user = LoginUser.getInstance();
		if (ObjectKit.isNotNull(user)){
			mav.setViewName(PREFIX+"resource_add");
		}else{
			String servletPath = request.getServletPath();
			mav.addObject("requestURI",servletPath);
			mav.setViewName("redirect:/login");
			return mav;
		}
		List<SysDict> labelList = sysDictService.findAllByType("label");
		mav.addObject("labelList",labelList);
		return mav;
	}

	/**
	 * 修改知识
	 * @param docKnowledge
	 * @param errors
	 * @return
	 */
	@PostMapping("/edit")
	public SimpleResponse edit(@Valid DocKnowledge docKnowledge, BindingResult errors) {
		DocKnowledge oldDocKnowledge = docKnowledgeService.findByUuid(docKnowledge.getUuid());
		SimpleResponse response = validErrors(errors);
		try{
			SysUser user = LoginUser.getInstance();
			if(user!=null&&!"".equals(user)){
				docKnowledge.setCreateById(user.getId());
				docKnowledge.setCreateBy(user.getNickname());
			}
			if(response!=null) {
				return response;
			}
			//资源
			if("1".equals(docKnowledge.getDocType())){
				docKnowledge.setDocPicUrlIds(oldDocKnowledge.getDocPicUrlIds());
				JSONArray jsonArray=docKnowledge.getPicResourceArr();
				if(ObjectKit.isNotNull(docKnowledge.getPicResourceArr())){
					for(int i=0;i<jsonArray.length();i++){
						PicResources picResources = new PicResources();
						picResources.setCreateDate(new Date());
						picResources.setDocOriginalName(jsonArray.getJSONObject(i).getString("docOriginalName"));
						picResources.setExtensionName(jsonArray.getJSONObject(i).getString("extensionName"));
						picResources.setResourceUrl(jsonArray.getJSONObject(i).getString("resourceUrl"));
						picResources.setUniqueCode(jsonArray.getJSONObject(i).getString("uniqueCode"));
						picResources.setSize(jsonArray.getJSONObject(i).getString("size"));
						picResources.setParentUuid(oldDocKnowledge.getDocPicUrlIds());
						picResources.setCreateBy(user.getNickname());
						picResourcesService.save(picResources);
					}
				}
			}else {

			}
			docKnowledge.setUpdateDate(new Date());
			if(docKnowledgeService.updateTemplate(docKnowledge)) {
				response = new SimpleResponse(1,"修改成功",200);
				//修改索引
				LuceneIKUtil luceneProcess = new LuceneIKUtil(luceneProperties.getUrl());
				luceneProcess.update(docKnowledge);
			}else {
				response = new SimpleResponse("修改失败");
			}
			return response;
		}catch (Exception e){
			return new SimpleResponse("添加失败");
		}
	}
	@GetMapping("/editInfoResource")
	@ApiOperation(value="编辑文件知识页面")
	public ModelAndView editInfoResource(HttpServletRequest request,Long uuid) {
		SysUser user = LoginUser.getInstance();
		DocKnowledge docKnowledge = docKnowledgeService.findByUuid(uuid);
		if (ObjectKit.isNotNull(user)){
			if("1".equals(docKnowledge.getIsWordResource()+"")){
				mav.setViewName(PREFIX+"uploadWordResource");
			}else{
				mav.setViewName(PREFIX+"resource_edit");
			}
		}else{
			String servletPath = request.getServletPath();
			mav.addObject("requestURI",servletPath);
			mav.setViewName("redirect:/login");
			return mav;
		}
		List<SysDict> labelList = sysDictService.findAllByType("label");
		mav.addObject("picResourcesList", picResourcesService.findByParentUuid(docKnowledge.getDocPicUrlIds()));
		mav.addObject("labelList",labelList);
		mav.addObject("knowledgeClassify", knowledgeClassifyService.queryById(docKnowledge.getDocClassify()));
		mav.addObject("docKnowledge",docKnowledge);
		return mav;
	}
	@GetMapping("/editInfo")
	@ApiOperation(value="编辑文件知识页面")
	public ModelAndView editInfo(HttpServletRequest request,Long uuid) {
		SysUser user = LoginUser.getInstance();
		DocKnowledge docKnowledge = docKnowledgeService.findByUuid(uuid);
		if (ObjectKit.isNotNull(user)){
			mav.setViewName(PREFIX+"knowledge_edit");
		}else{
			String servletPath = request.getServletPath();
			mav.addObject("requestURI",servletPath);
			mav.setViewName("redirect:/login");
			return mav;
		}
		List<SysDict> labelList = sysDictService.findAllByType("label");
		mav.addObject("labelList",labelList);
		mav.addObject("knowledgeClassify", knowledgeClassifyService.queryById(docKnowledge.getDocClassify()));
		mav.addObject("docKnowledge",docKnowledge);
		return mav;
	}

	@PostMapping("/add")
	@ResponseBody
	public SimpleResponse add(@Valid DocKnowledge docKnowledge, BindingResult errors) throws JSONException {
		SimpleResponse response = validErrors(errors);
		try{
			String picUuid= UUID.randomUUID().toString().replace("-", "");
			SysUser user = LoginUser.getInstance();
			if(user!=null&&!"".equals(user)){
				docKnowledge.setCreateById(user.getId());
				docKnowledge.setCreateBy(user.getNickname());
			}
			if(response!=null) {
				return response;
			}
			//资源
			if("1".equals(docKnowledge.getDocType())){
				docKnowledge.setDocPicUrlIds(picUuid);
				JSONArray jsonArray=docKnowledge.getPicResourceArr();
				if(ObjectKit.isNotNull(docKnowledge.getPicResourceArr())){
					for(int i=0;i<jsonArray.length();i++){
						PicResources picResources = new PicResources();
						picResources.setCreateDate(new Date());
						picResources.setDocOriginalName(jsonArray.getJSONObject(i).getString("docOriginalName"));
						picResources.setExtensionName(jsonArray.getJSONObject(i).getString("extensionName"));
						picResources.setResourceUrl(jsonArray.getJSONObject(i).getString("resourceUrl"));
						picResources.setUniqueCode(jsonArray.getJSONObject(i).getString("uniqueCode"));
						picResources.setSize(jsonArray.getJSONObject(i).getString("size"));
						picResources.setParentUuid(picUuid);
						picResources.setCreateBy(user.getNickname());
						picResourcesService.save(picResources);
					}
				}
			}else {

			}
			docKnowledge.setCreateDate(new Date());
			docKnowledge.setUpdateDate(new Date());
			if(docKnowledgeService.save(docKnowledge)) {
				response = new SimpleResponse(1,"添加成功",200);
				//添加索引到硬盘
				LuceneIKUtil luceneProcess = new LuceneIKUtil(luceneProperties.getUrl());
				luceneProcess.appendIndex(docKnowledge);
			}else {
				response = new SimpleResponse("添加失败");
			}
			return response;
		}catch (Exception e){
			return new SimpleResponse("添加失败");
		}

	}


	@GetMapping("/showInfo")
	@ApiOperation(value="编辑知识页面")
	public ModelAndView editInfo(String uuid,String docClassify,String docType ) {
		SysUser user = LoginUser.getInstance();
		DocKnowledge docKnowledge = docKnowledgeService.findByUuid(Long.valueOf(uuid));
		docKnowledge.setLabelList(sysDictService.getNameByValue(docKnowledge.getLabel(),"label"));
		if(user!=null&&!"".equals(user)){
			mav.addObject("userId", user.getId());
			//判断用户是否关注此知识/文件
			Integer attentionNum = knowledgeAttentionSysUserService.findCount(Long.valueOf(uuid),Long.valueOf(user.getId()));
			//判断用户是否点赞此知识/文件
			Integer praiseNum = praiseSysUserService.findCount(Long.valueOf(uuid),Long.valueOf(user.getId()));
			if(attentionNum>0){
				mav.addObject("isAttention",1);
			}else{
				mav.addObject("isAttention",0);
			}
			if(praiseNum>0){
				mav.addObject("isPraise",1);
			}else{
				mav.addObject("isPraise",0);
			}

		}else{
			mav.addObject("user",user);
			mav.addObject("userId", -1);
			mav.addObject("isAttention",0);
			mav.addObject("isPraise",0);
		}

		//登录状态下查看知识加上阅读量
		if(ObjectKit.isNotNull(user)){
			String key = RedisKeyUtils.getRuleKey(user.getId().toString(), docKnowledge.getUuid().toString(),"readCount");
			if(!redisUtils.hasKey(key)){
				redisUtils.incr(key,1+docKnowledge.getReadCount());
				redisUtils.expire(key,5*60*6);
				docKnowledge.setReadCount((int)redisUtils.get(key));
				docKnowledgeService.update(docKnowledge);
			}
		}
		//点击率
		String crt = uuid+"::crtNum";
		if(!redisUtils.hasKey(crt)){
			redisUtils.incr(crt,1+docKnowledge.getCrt());
			redisUtils.hset("crt",crt,redisUtils.get(crt));
		}else{
			redisUtils.incr(crt,1);
			redisUtils.hset("crt",crt,redisUtils.get(crt));
		}

		mav.addObject("docKnowledge", docKnowledge);
		String locations = docKnowledgeService.getLocationByDocClassify(docClassify);
		mav.addObject("locations",locations);
		//获得同类知识
		List<DocKnowledge> theSameDocKnowledgeList = docKnowledgeService.findByDocClassify(docClassify,docKnowledge.getUuid(),docKnowledge.getIsWordResource());
		//推荐知识
		List<DocKnowledge> theRecommendSDocKnowledgeList = docKnowledgeService.findByDocValue(docKnowledge.getUuid());
		mav.addObject("theSameDocKnowledgeList",theSameDocKnowledgeList);
		mav.addObject("theRecommendSDocKnowledgeList",theRecommendSDocKnowledgeList);
		//获得评论数
		int praiseCount = knowledgePraiseService.findCountByKnowledgeUuid(docKnowledge.getUuid());
		mav.addObject("praiseCount",praiseCount);
		if("1".equals(docType)){//前往文件资源页面
			List<PicResources> picResourcesList=picResourcesService.findByParentUuid(docKnowledge.getDocPicUrlIds());
			mav.setViewName(PREFIX+"content_file");
			mav.addObject("picResourcesList", picResourcesList);
		}else if("0".equals(docType)){//前往文档知识页面
			mav.setViewName(PREFIX+"content_text");
		}
		return mav;
	}

	@GetMapping("/viewDetail")
	public ModelAndView viewDetail(String uuid) {
		PicResources picResource = picResourcesService.findByUuid(Long.valueOf(uuid));
		mav.setViewName(PREFIX+"content_file_details");
		mav.addObject("picResource",picResource);
		return mav;
	}

	/**
	 * 关注与取消关注
	 * @param knowledgeAttentionSysUser
	 * @param content
	 * @param errors
	 * @return
	 */
	@PostMapping("/isAttention")
	@ResponseBody
	public SimpleResponse isAttention(KnowledgeAttentionSysUser knowledgeAttentionSysUser,String content, BindingResult errors){
		SimpleResponse response = validErrors(errors);
		try {
			if(!ObjectKit.isNotNull(LoginUser.getInstance())){
				return  new SimpleResponse("请先登录");
			}
			if("已关注".equals(content)){
				knowledgeAttentionSysUser=knowledgeAttentionSysUserService.findByOther(knowledgeAttentionSysUser.getKnowledgeUuid(), knowledgeAttentionSysUser.getUserId());
				if(ObjectKit.isNotNull(knowledgeAttentionSysUser)){
					boolean flag = knowledgeAttentionSysUserService.delete(knowledgeAttentionSysUser.getId()+"");
					if(flag){
						response = new SimpleResponse(1,"取消关注",200);
					}else{
						response = new SimpleResponse("取消关注失败");
					}
				}

			}else if("关注".equals(content)){
				boolean flag = knowledgeAttentionSysUserService.save(knowledgeAttentionSysUser);
				if(flag){
					response = new SimpleResponse(1,"关注成功",200);
				}else{
					response = new SimpleResponse("关注失败");
				}
			}

			return response;

		}catch (Exception e){
			return new SimpleResponse(0,"操作失败");
		}

	}

	/**
	 * 点赞功能
	 * @param praiseSysUser
	 * @param value
	 * @param errors
	 * @return
	 */
	@PostMapping("/isPraise")
	@ResponseBody
	public SimpleResponse isPraise(PraiseSysUser praiseSysUser, String value, BindingResult errors){
		DocKnowledge docKnowledge = docKnowledgeService.findByUuid(praiseSysUser.getKnowledgeUuid());
		String msg = "操作失败";
		SimpleResponse response = validErrors(errors);
		try {
			if(!ObjectKit.isNotNull(LoginUser.getInstance())){
				msg = "请先登录,再进行操作";
				throw new Exception();
			}
			if("1".equals(value)){
				praiseSysUser = praiseSysUserService.findByOther(praiseSysUser.getKnowledgeUuid(), praiseSysUser.getUserId());
				if(ObjectKit.isNotNull(praiseSysUser)){
					boolean flag = praiseSysUserService.delete(praiseSysUser.getId()+"");
					if(flag){
						if(docKnowledge.getLikes()>0){
							docKnowledge.setLikes(docKnowledge.getLikes()-1);
						}
						System.out.println(docKnowledge);
						docKnowledgeService.update(docKnowledge);
						response = new SimpleResponse(1,"取消点赞",200);
						response.setContent(docKnowledge);

					}else{
						response = new SimpleResponse("取消点赞失败");
					}
				}

			}else if("0".equals(value)){
				boolean flag = praiseSysUserService.save(praiseSysUser);
				if(flag){
					System.out.println(docKnowledge.getLikes());
					docKnowledge.setLikes(docKnowledge.getLikes()+1);
					docKnowledgeService.update(docKnowledge);
					response = new SimpleResponse(1,"感谢点赞！QAQ",200);
					response.setContent(docKnowledge);
				}else{
					response = new SimpleResponse("点赞失败!AQA");
				}
			}

			return response;

		}catch (Exception e){
			return new SimpleResponse(0,msg,500);
		}
	}

	/**
	 * 好差评
	 * @return
	 */
	@PostMapping("/goodPraise")
	@ResponseBody
	public SimpleResponse goodPraise(String docUuid,String type){
		DocKnowledge docKnowledge = docKnowledgeService.findByUuid(Long.valueOf(docUuid));
		String msg = "操作失败";
		Object content=null;
		Map<String,Object> map =new  HashMap<>();
		SysUser sysUser = LoginUser.getInstance();
		SimpleResponse response = new SimpleResponse();
		try {
			if(!ObjectKit.isNotNull(sysUser)){
				msg = "请先登录,再操作";
				return  new SimpleResponse(msg);
			}

			//好评
			if("0".equals(type)){
				String key = RedisKeyUtils.getRuleKey(sysUser.getId().toString(), docUuid,"goodCount");
				int count = knowledgeSysUserService.findCount(Long.valueOf(docUuid),Long.valueOf(sysUser.getId()),1);
				if(!redisUtils.hasKey(key)&&count<1){
					redisUtils.incr(key,1+docKnowledge.getGoodCount());
					redisUtils.expire(key,5*60);
					map.put(key,redisUtils.get(key));
					redisUtils.lSet(RedisKeyUtils.PERSON_GOOD_PRAISE_COUNT, map);
					content=redisUtils.get(key);
				}else if (count<1){
					content=redisUtils.get(key);
				}else{
					content=docKnowledge.getGoodCount();
				}

				response = new SimpleResponse(1,"谢谢",200,content);


			}else if("1".equals(type)){//差评
				String key = RedisKeyUtils.getRuleKey(sysUser.getId().toString(), docUuid,"badCount");
				int count = knowledgeSysUserService.findCount(Long.valueOf(docUuid),Long.valueOf(sysUser.getId()),2);
				if(!redisUtils.hasKey(key)&&count<1){
					redisUtils.incr(key,docKnowledge.getBadCount()+1);
					redisUtils.expire(key,5*60);
					map.put(key,redisUtils.get(key));
					redisUtils.lSet(RedisKeyUtils.PERSON_BAD_PRAISE_COUNT, map);
					content=redisUtils.get(key);
				}else if (count<1){
					content=redisUtils.get(key);
				}else{
					content=docKnowledge.getBadCount();
				}
				response = new SimpleResponse(0,"很抱歉",200,content);

			}

			return response;

		}catch (Exception e){
			return new SimpleResponse(0,msg);
		}



	}

	/**
	 * 好差评
	 * @return
	 */
	@PostMapping("/badPraise")
	@ResponseBody
	public SimpleResponse isPraise(String docUuid,String type){
		DocKnowledge docKnowledge = docKnowledgeService.findByUuid(Long.valueOf(docUuid));
		String msg = "操作失败";
		int content=0;
		Map<String,Object> map =new  HashMap<>();
		SysUser sysUser = LoginUser.getInstance();
		SimpleResponse response = new SimpleResponse();
		try {
			if(!ObjectKit.isNotNull(sysUser)){
				msg = "请先登录,再操作";
				return  new SimpleResponse(msg);
			}

			int goodCount = knowledgeSysUserService.findCount(Long.valueOf(docUuid),Long.valueOf(sysUser.getId()),1);
			KnowledgeSysUser knowledgeSysUserGood = knowledgeSysUserService.findByOther(Long.valueOf(docUuid), Long.valueOf(sysUser.getId()), 1);
			int badCount = knowledgeSysUserService.findCount(Long.valueOf(docUuid),Long.valueOf(sysUser.getId()),2);
			KnowledgeSysUser knowledgeSysUserBad = knowledgeSysUserService.findByOther(Long.valueOf(docUuid), Long.valueOf(sysUser.getId()), 2);
			//好评
			if("0".equals(type)){
				KnowledgeSysUser knowledgeSysUser = new KnowledgeSysUser();
				knowledgeSysUser.setType(1);
				knowledgeSysUser.setKnowledgeUuid(Long.valueOf(docUuid));
				knowledgeSysUser.setUserId(Long.valueOf(sysUser.getId()));
				content = docKnowledge.getGoodCount();
				if(goodCount<1&&badCount<1){
					content=content+1;
					docKnowledge.setGoodCount(content);
					knowledgeSysUserService.save(knowledgeSysUser);
					docKnowledgeService.update(docKnowledge);
				}else if(goodCount<1&&badCount>=1){
					content=content+1;
					docKnowledge.setGoodCount(content);
					docKnowledge.setBadCount(docKnowledge.getBadCount()-1);
					knowledgeSysUserService.save(knowledgeSysUser);
					knowledgeSysUserService.deleteByType(knowledgeSysUserBad);
					docKnowledgeService.update(docKnowledge);
				}else{

				}


				response = new SimpleResponse(1,"谢谢",200,content);

			}else if("1".equals(type)){//差评
				content = docKnowledge.getBadCount();
				KnowledgeSysUser knowledgeSysUser = new KnowledgeSysUser();
				knowledgeSysUser.setType(2);
				knowledgeSysUser.setKnowledgeUuid(Long.valueOf(docUuid));
				knowledgeSysUser.setUserId(Long.valueOf(sysUser.getId()));
				if(badCount<1&&goodCount<1){
					content = content+1;
					docKnowledge.setBadCount(content);
					knowledgeSysUserService.save(knowledgeSysUser);
					docKnowledgeService.update(docKnowledge);
				}else if(badCount<1&&goodCount>=1){
					content = content+1;
					docKnowledge.setGoodCount(docKnowledge.getGoodCount()-1);
					docKnowledge.setBadCount(content);
					knowledgeSysUserService.save(knowledgeSysUser);
					knowledgeSysUserService.deleteByType(knowledgeSysUserGood);
					docKnowledgeService.update(docKnowledge);
				}else{

				}


				response = new SimpleResponse(0,"很抱歉",200,content);

			}

			return response;

		}catch (Exception e){
			return new SimpleResponse(0,msg);
		}



	}

	@GetMapping(value = "/getDocKnowledgeTree")
	@ApiOperation(value = "获取知识树")
    public String tree(HttpServletRequest req,HttpServletResponse resp) {
		LayuiResponse layuiResponse = new LayuiResponse();
		String uuid = req.getParameter("uuid");
		Long id = null;
		if(StringUtils.isNotBlank(uuid)){
			id=Long.valueOf(uuid);
		}
		List docKnowledges = docKnowledgeService.getKnowledgeClassifyTree(id);
		//已选中的id集合 逗号隔开
		String docClassify = req.getParameter("docClassify");
		if(StringUtils.isNotBlank(docClassify)) {
			List<String> idList = Arrays.asList(docClassify.split(","));
			for(Object obj : docKnowledges) {
				if(obj instanceof DTreeNode) {
					DTreeNode node = (DTreeNode) obj;
					if(idList.contains(node.getId())) {
						node.setCheckArr("1");
						continue;
					}
				}
			}
		}
		ResultData resultData = new ResultData();
		resultData.setCode(200);
		resultData.setMessage("操作成功");
		layuiResponse.setData(docKnowledges);
		ResultTree resultTree = new ResultTree();
		resultTree.setStatus(resultData);
		resultTree.setData(docKnowledges);
        return JSON.toJSONString(resultTree);
    }

	/**
	 * 获得知识树
	 * @param req
	 * @param resp
	 * @return
	 */
	@GetMapping(value = "/getKnowledgeClassify")
	public ModelAndView getKnowledgeClassify(HttpServletRequest req,HttpServletResponse resp,String type) {
		List<KnowledgeClassify> knowledgeClassifyRootList = docKnowledgeService.getKnowledgeClassifySecondList(Long.valueOf(0));//知识分类根步
		if(ObjectKit.isNotNull(knowledgeClassifyRootList)){
			for (KnowledgeClassify knowledgeClassifyRoot : knowledgeClassifyRootList){
				List<KnowledgeClassify> knowledgeClassifySecondList = docKnowledgeService.getKnowledgeClassifySecondList(Long.valueOf(knowledgeClassifyRoot.getUuid()));//二层分类
				if (ObjectKit.isNotNull(knowledgeClassifySecondList)){
					for (KnowledgeClassify knowledgeClassify : knowledgeClassifySecondList){
						knowledgeClassify.setLocation(knowledgeClassifyRoot.getClassifyName()+"/"+knowledgeClassify.getClassifyName());
						List<KnowledgeClassify> knowledgeClassifyThirdlyList = docKnowledgeService.getKnowledgeClassifySecondList(Long.valueOf(knowledgeClassify.getUuid()));//三层分类
						if (ObjectKit.isNotNull(knowledgeClassifyThirdlyList)){
							for (KnowledgeClassify knowledgeClassify1 : knowledgeClassifyThirdlyList){
								knowledgeClassify1.setLocation(knowledgeClassify.getLocation()+"/"+knowledgeClassify1.getClassifyName());
								knowledgeClassify1.setCount(docKnowledgeService.getCountByClassifyParentId(Long.valueOf(knowledgeClassify1.getUuid())));
							}

						}
						knowledgeClassify.setCount(docKnowledgeService.getCountByClassifyParentId(Long.valueOf(knowledgeClassify.getUuid())));
						knowledgeClassify.setChildrenClassify(knowledgeClassifyThirdlyList);
					}

				}
				knowledgeClassifyRoot.setCount(docKnowledgeService.getCountByClassifyParentId(Long.valueOf(1)));
				knowledgeClassifyRoot.setChildrenClassify(knowledgeClassifySecondList);
			}
		}
		if("1".equals(type)){
			mav.setViewName(PREFIX+"doc_list");
		}else{
			DocKnowledge docKnowledge = new DocKnowledge();
			docKnowledge.setPage(1);
			docKnowledge.setLimit(6);
			LayuiResponse page = docKnowledgeService.findPage(docKnowledge);
			//待修改————————————————————————————————————
			KnowledgeKeywords knowledgeKeywords = new KnowledgeKeywords();
			knowledgeKeywords.setPage(1);
			knowledgeKeywords.setLimit(10);
			LayuiResponse page1 = knowledgeKeywordsService.findPage(knowledgeKeywords);
			mav.addObject("knowledgeKeywordsList",page1.getData());
			mav.addObject("docKnowledgeList",page.getData());
			mav.setViewName("/open/main");
		}
		mav.addObject("knowledgeClassifyRootList",knowledgeClassifyRootList);

		return mav;
	}
	@GetMapping("/picResourceList")
	public void picResourceList(PicResources picResources){
		LayuiResponse layuiResponse = picResourcesService.findPage(picResources);
		returnJson(layuiResponse);
	}

	@DeleteMapping("/delete")
	public SimpleResponse delete(@RequestBody String ids) {
		SimpleResponse response = null;
		if(picResourcesService.forceDelete(Long.parseLong(ids))>0) {
			response = new SimpleResponse(1, "删除成功");
		}else {
			response = new SimpleResponse("删除失败");
		}
		return response;
	}

	/**
	 * 下载资源知识
	 * @param docKnowledge
	 * @return
	 */
	@GetMapping("/downloadFile")
	public ModelAndView downloadFile(DocKnowledge docKnowledge) {
		LayuiResponse page = docKnowledgeService.findPage(docKnowledge);
		mav.addObject("count",page.getCount());
		mav.addObject("docKnowledgeList",page.getData());
		mav.addObject("startCreateDate",docKnowledge.getStartCreateDate());
		mav.addObject("endCreateDate",docKnowledge.getEndCreateDate());
		mav.addObject("docKnowledge",docKnowledge.getKnowledgeName());
		mav.setViewName(PREFIX+"downloadFile");
		return mav;
	}

	/**
	 * 格式化前台传来的时间格式参数
	 * @param request
	 * @param binder
	 */
	@InitBinder
	protected void initBinder(HttpServletRequest request, ServletRequestDataBinder binder) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		simpleDateFormat.setLenient(false);
		CustomDateEditor dateEditor = new CustomDateEditor(simpleDateFormat, true);
		binder.registerCustomEditor(Date.class,dateEditor);
	}
	@GetMapping("/downloadFilePage")
	public ModelAndView downloadFilePage(DocKnowledge docKnowledge) {
		LayuiResponse page = docKnowledgeService.findPage(docKnowledge);
		mav.addObject("count",page.getCount());
		mav.addObject("startCreateDate",docKnowledge.getStartCreateDate());
		mav.addObject("endCreateDate",docKnowledge.getEndCreateDate());
		mav.addObject("docKnowledgeList",page.getData());
		mav.addObject("docKnowledge",docKnowledge.getKnowledgeName());
		mav.setViewName(PREFIX+"downloadFilePage");
		return mav;
	}

	@ResponseBody
	@GetMapping("/download")
	public List<PicResources> download(PicResources picResources) {
		List<PicResources> byParentUuid = picResourcesService.findByParentUuid(picResources.getParentUuid());
		return byParentUuid;
	}

	@GetMapping("/toUploadWordResource")
	public ModelAndView toUploadWordResource(HttpServletRequest request,Long uuid){
		SysUser sysUser = LoginUser.getInstance();
		DocKnowledge docKnowledge = new DocKnowledge();
		if(ObjectKit.isNotNull(uuid)){
			docKnowledge = docKnowledgeService.findByUuid(uuid);
		}else{
			docKnowledge.setDocPicUrlIds("1");//给创建word知识一个默认的不存在附件id
		}

		if (ObjectKit.isNotNull(sysUser)){
			mav.setViewName(PREFIX+"uploadWordResource");
			mav.addObject("docKnowledge",docKnowledge);
		}else{
			String servletPath = request.getServletPath();
			mav.addObject("requestURI",servletPath);
			mav.setViewName("redirect:/login");
			return mav;
		}
		return mav;
	}

	/**
	 * 保存上传的word知识
	 * @param file
	 * @param versions
	 * @return
	 * @throws Exception
	 */
	@PostMapping(produces="application/json;charset=utf-8",value = "/file")
	@ResponseBody
	public JsonResult upload(MultipartFile file, String versions,String parentUuid,Long uuid) throws Exception {
		SysUser sysUser = LoginUser.getInstance();
		String originalFilename = file.getOriginalFilename();
		FileInfo fileInfo = new FileInfo(file.getInputStream(), file.getOriginalFilename(), file.getSize());
		String uniqueCode = fileManage.uploadFileToFileManage(fileInfo);
		String url = fileManage.getDownloadURLStr(uniqueCode);
		if(ObjectKit.isNotNull(uuid)){
			DocKnowledge docKnowledge = docKnowledgeService.findByUuid(uuid);
			int count = picResourcesService.findCount(docKnowledge.getDocPicUrlIds());
			if (count==1){
				version = parentUuid;
			}else{
				docKnowledge.setKnowledgeName(file.getOriginalFilename());
				docKnowledgeService.update(docKnowledge);
			}
			version = parentUuid;
		}else{
			try {
				Integer id = sysUser.getId();
				if(!versions.equals(version)){
					FLAG = true;
				}
				if(FLAG){
					FLAG = false;
					version=versions;
					DocKnowledge docKnowledge = new DocKnowledge();
					KnowledgeClassify knowledgeClassify = knowledgeClassifyService.getRoot("0");
					docKnowledge.setCreateDate(new Date());
					docKnowledge.setCreateBy(sysUser.getUsername());
					docKnowledge.setCreateById(id);
					docKnowledge.setDocPicUrlIds(version);
					docKnowledge.setDocType("1");
					docKnowledge.setLabel("1");
					docKnowledge.setDocClassify(knowledgeClassify.getUuid());
					docKnowledge.setKnowledgeName(file.getOriginalFilename());
					docKnowledge.setIsReleaseGroup("0");
					docKnowledge.setEditPermissions("0");
					docKnowledge.setReadPermissions("1");
					docKnowledge.setIsWordResource(1);
					docKnowledgeService.save(docKnowledge);
				}
			}catch (Exception e){
				return JsonResult.error("请先登录");
			}
		}

		PicResources picResources = new PicResources();//保存进附件表
		picResources.setCreateBy(sysUser.getUsername());
		picResources.setUniqueCode(uniqueCode);
		picResources.setResourceUrl(url);
		picResources.setDocOriginalName(originalFilename);
		picResources.setParentUuid(version);
		picResources.setSize(getPrintSize(file.getSize()));
		picResources.setExtensionName(originalFilename.substring(originalFilename.lastIndexOf(".")+1,originalFilename.length()));
		picResources.setCreateDate(new Date());
		picResourcesService.save(picResources);
		return JsonResult.ok("创建成功");
	}
	public  String getPrintSize(long size) {
		//如果字节数少于1024，则直接以B为单位，否则先除于1024，后3位因太少无意义
		if (size < 1024) {
			return String.valueOf(size) + "B";
		} else {
			size = size / 1024;
		}
		//如果原字节数除于1024之后，少于1024，则可以直接以KB作为单位
		//因为还没有到达要使用另一个单位的时候
		//接下去以此类推
		if (size < 1024) {
			return String.valueOf(size) + "KB";
		} else {
			size = size / 1024;
		}
		if (size < 1024) {
			//因为如果以MB为单位的话，要保留最后1位小数，
			//因此，把此数乘以100之后再取余
			size = size * 100;
			return String.valueOf((size / 100)) + "."
					+ String.valueOf((size % 100)) + "MB";
		} else {
			//否则如果要以GB为单位的，先除于1024再作同样的处理
			size = size * 100 / 1024;
			return String.valueOf((size / 100)) + "."
					+ String.valueOf((size % 100)) + "GB";
		}
	}


}


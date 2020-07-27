/**  

* <p>Title: SysDeptController.java</p>  

* <p>Description: </p>    

* <p>Company: www.vingsoft.com</p>  

* @author MrTang

* @date 2018年11月24日  

* @version 1.0  

*/  
package com.vingsoft.oa.open.doc.controller;

import com.vingsoft.common.node.DTreeNode;
import com.vingsoft.core.response.LayuiResponse;
import com.vingsoft.core.response.SimpleResponse;
import com.vingsoft.oa.common.base.BaseController;
import com.vingsoft.oa.open.doc.entity.KnowledgeClassify;
import com.vingsoft.oa.open.doc.service.KnowledgeClassifyService;
import org.apache.commons.lang.StringUtils;
import org.beetl.sql.core.SQLManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;


/**  

* <p>Title: SysDeptController</p>  

* <p>Description: 菜单控制器</p>  

* @author MrTang

* @date 2018年11月24日  

*/
@RestController
@RequestMapping("/doc/classify")
@SuppressWarnings({"rawtypes","unchecked"})
public class KnowledgeClassifyController extends BaseController {
	
	private String PREFIX = "/open/doc/classify/";
	
	@Autowired
	private KnowledgeClassifyService knowledgeClassifyService;
	@Autowired
	private SQLManager sqlManager;
	

	
	@GetMapping
	public ModelAndView index() {
		mav.setViewName(PREFIX+"list");
		return mav;
	}
	
	@GetMapping("/queryList")
	public void queryList(KnowledgeClassify knowledgeClassify, HttpServletRequest request, HttpServletResponse response) throws IOException {
		String nodeId = request.getParameter("nodeId");
		if(StringUtils.isNotBlank(nodeId)) {
			knowledgeClassify.setClassifyParentUuid(nodeId);
		}
		LayuiResponse layuiResponse = knowledgeClassifyService.findPage(knowledgeClassify);
		returnJson(layuiResponse);
	}
	
	@GetMapping("/addClassify")
	public ModelAndView addDept() {
		mav.setViewName(PREFIX+"add");
		return mav;
	}
	
	
	@PostMapping("/add")
	@ResponseBody
	public SimpleResponse add(KnowledgeClassify knowledgeClassify, BindingResult errors) {
		SimpleResponse response = validErrors(errors);
		if(response!=null) {
			return response;
		}
		if(knowledgeClassifyService.save(knowledgeClassify)) {
			response = new SimpleResponse(1, "分类添加成功");
		}else {
			response = new SimpleResponse("分类添加失败");
		}
		
		return response;
	}
	
	@GetMapping("/editClassify/{uuid:\\d+}")
	public ModelAndView editDept(@PathVariable String uuid) {
		mav.addObject("knowledgeClassify", knowledgeClassifyService.queryById(uuid));
		mav.setViewName(PREFIX+"edit");
		return mav;
	}
	
	
	@PutMapping("/edit")
	public SimpleResponse edit(KnowledgeClassify knowledgeClassify) {
		SimpleResponse response = null;
		if(knowledgeClassifyService.updateTemplate(knowledgeClassify)) {
			response = new SimpleResponse(1, "分类编辑成功");
		}else {
			response = new SimpleResponse("分类编辑失败");
		}
		
		return response;
	}
	
	@DeleteMapping("/delete")
	public SimpleResponse delete(@RequestBody String ids) {
		SimpleResponse response = null;
		ids = ids.substring(1, ids.length()-1);
		List<String> idList = new ArrayList<String>();
		String[] idArr = ids.split(",");
		for (String arr : idArr) {
			if(StringUtils.isNotBlank(arr)) {
				String lId = new String(arr);
				idList.add(lId);
			}
		}
		
		for(String id:idList) {
			//验证是否有子菜单
			List list = knowledgeClassifyService.queryByPid(id);
			if(list!=null&&list.size()>0) {
				return new SimpleResponse("含有子菜单，无法删除");
			}
			
			if(knowledgeClassifyService.forceDelete(Long.parseLong(id))>0) {
				response = new SimpleResponse(1, "菜单删除成功");
				
				
				
			}else {
				response = new SimpleResponse("菜单删除失败");
			}
		}
		
		return response;
	}
	
	@GetMapping(value = "/getClassifyTree")
    public LayuiResponse tree(HttpServletRequest req, HttpServletResponse resp) {
		LayuiResponse layuiResponse = new LayuiResponse();
		List classifyTree = knowledgeClassifyService.getClassifyTree();
		
		//已选中的id集合 逗号隔开
		String ids = req.getParameter("ids");
		if(StringUtils.isNotBlank(ids)) {
			List<String> idList = Arrays.asList(ids.split(","));
			for(Object obj : classifyTree) {
				if(obj instanceof DTreeNode) {
					DTreeNode node = (DTreeNode) obj;
					if(idList.contains(node.getId())) {
						node.setCheckArr("1");
						continue;
					}
				}
			}
		}
		
		layuiResponse.setData(classifyTree);
        return layuiResponse;
    }

	@GetMapping(value = "/getClassifyTrees")
	public LayuiResponse classifyTree(HttpServletRequest req, HttpServletResponse resp) {
		LayuiResponse layuiResponse = new LayuiResponse();
		List classifyTree = knowledgeClassifyService.getClassifyTree();
		layuiResponse.setData(classifyTree);
		Map<String ,Object> map = new HashMap<>();
		map.put("code",200);
		map.put("message","操作成功");
		layuiResponse.setStatus(map);
		return layuiResponse;
	}
}

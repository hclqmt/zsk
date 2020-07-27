/**  

* <p>Title: SysDeptController.java</p>  

* <p>Description: </p>    

* <p>Company: www.vingsoft.com</p>  

* @author MrTang

* @date 2018年11月24日  

* @version 1.0  

*/  
package com.vingsoft.oa.open.doc.controller;

import com.vingsoft.core.response.LayuiResponse;
import com.vingsoft.core.response.SimpleResponse;
import com.vingsoft.oa.common.base.BaseController;
import com.vingsoft.oa.open.doc.entity.KnowledgeKeywords;
import com.vingsoft.oa.open.doc.service.KnowledgeKeywordsService;
import org.apache.commons.lang.StringUtils;
import org.beetl.sql.core.SQLManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;


/**  

* <p>Title: SysDeptController</p>  

* <p>Description: 菜单控制器</p>  

* @author MrTang

* @date 2018年11月24日  

*/
@RestController
@RequestMapping("/doc/keywords")
@SuppressWarnings({"rawtypes","unchecked"})
public class KnowledgeKeywordsController extends BaseController {
	
	private String PREFIX = "/open/doc/keywords/";
	
	@Autowired
	private KnowledgeKeywordsService knowledgeKeywordsService;
	@Autowired
	private SQLManager sqlManager;
	

	
	@GetMapping
	public ModelAndView index() {
		mav.setViewName(PREFIX+"list");
		return mav;
	}
	
	@GetMapping("/queryList")
	public void queryList(KnowledgeKeywords knowledgeKeywords){
		LayuiResponse layuiResponse = knowledgeKeywordsService.findPage(knowledgeKeywords);
		returnJson(layuiResponse);
	}
	
	@GetMapping("/addKeywords")
	public ModelAndView addKeywords() {
		mav.setViewName(PREFIX+"add");
		return mav;
	}
	
	
	@PostMapping("/add")
	@ResponseBody
	public SimpleResponse add(KnowledgeKeywords knowledgeKeywords, BindingResult errors) {
		SimpleResponse response = validErrors(errors);
		if(response!=null) {
			return response;
		}
		if(knowledgeKeywordsService.save(knowledgeKeywords)) {
			response = new SimpleResponse(1, "添加成功");
		}else {
			response = new SimpleResponse("添加失败");
		}
		
		return response;
	}
	
	@GetMapping("/editKeywords/{id:\\d+}")
	public ModelAndView editDept(@PathVariable Integer id) {
		mav.addObject("knowledgeKeywords", knowledgeKeywordsService.queryById(id));
		mav.setViewName(PREFIX+"edit");
		return mav;
	}
	
	
	@PutMapping("/edit")
	public SimpleResponse edit(KnowledgeKeywords knowledgeKeywords) {
		SimpleResponse response = null;
		if(knowledgeKeywordsService.updateTemplate(knowledgeKeywords)) {
			response = new SimpleResponse(1, "编辑成功");
		}else {
			response = new SimpleResponse("编辑失败");
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
			if(knowledgeKeywordsService.forceDelete(Long.parseLong(id))>0) {
				response = new SimpleResponse(1, "删除成功");



			}else {
				response = new SimpleResponse("删除失败");
			}
		}
		
		return response;
	}

}

package com.vingsoft.fileManage.controller;


import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.model.ObjectMetadata;
import com.aliyun.oss.model.PutObjectResult;
import com.vingsoft.core.response.LayuiResponse;
import com.vingsoft.fileManage.core.FileManage;
import com.vingsoft.fileManage.utils.FileUtil;
import com.vingsoft.fileManage.utils.OssUtils;
import com.vingsoft.fileManager.client.FileInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.support.StandardMultipartHttpServletRequest;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.URL;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * 

* <p>Title: FileController</p>  

* <p>Description: 文件控制器</p>  

* @author MrTang

* @date 2018年11月30日
 */

@RestController
@RequestMapping("/file")
@Api(tags="文件管理")
public class FileController {

	private static Logger logger = LoggerFactory.getLogger(FileController.class);
	
	@Autowired
	private FileManage fileManage;

	@Autowired
	private OssUtils ossUtils;


	private static String ENDPOINT = "oss-cn-shanghai.aliyuncs.com";
	private static String ACCESSKEYID = "LTAI4GG4ELsMJsYMFY7Vy5M9";
	private static String ACCESSKEYSECRET = "OSoU6nzKCZzkYCdYfSH9xtkljRoj50";
	private static String BUCKETNAME = "hcl-oss";
	private static String KEY = "images/";
	
	/**
	 * 
	
	 * <p>Title: upload</p>  
	
	 * <p>Description: 上传文件,并返回layui指定json格式</p>  
	
	 * @param file
	 * @return
	 * @throws Exception
	 */
	@PostMapping(produces="application/json;charset=utf-8")
	@ResponseBody
	@ApiOperation(value="上传文件,并返回layui指定json格式",produces = MediaType.APPLICATION_JSON_VALUE)
	public LayuiResponse upload(MultipartFile file) throws Exception {
		String originalFilename = file.getOriginalFilename();
		logger.info(file.getName());
		logger.info(file.getOriginalFilename());
		logger.info(file.getSize()+"");

		FileInfo fileInfo = new FileInfo(file.getInputStream(), file.getOriginalFilename(), file.getSize());
		String uniqueCode = fileManage.uploadFileToFileManage(fileInfo);
		String url = fileManage.getDownloadURLStr(uniqueCode);
		
		LayuiResponse response = new LayuiResponse();
		response.setFileName(file.getOriginalFilename());
		if(StringUtils.isEmpty(uniqueCode)) {
			response.setCode(1);
		}else {
			response.setUniqueCode(uniqueCode);
			response.setSize(getPrintSize(file.getSize()));
			response.setFileExtensionName(originalFilename.substring(originalFilename.lastIndexOf(".")+1,originalFilename.length()));
			response.setFileUrl(url);
		}
		return response;
	}
	/**
	 *
	 * <p>Title: upload</p>

	 * <p>Description: 上传文件,并返回富文本指定格式</p>

	 * @param file
	 * @return
	 * @throws Exception
	 */
	@PostMapping("/ue")
	@ResponseBody
	@ApiOperation(value="上传文件,并返回layui指定json格式",produces = MediaType.APPLICATION_JSON_VALUE)
	public Object uploadUe(MultipartFile file) throws Exception {
		String originalFilename = file.getOriginalFilename();
		Map<String,Object> map = new HashMap<String,Object>();
		Map<String,Object> map2 = new HashMap<String,Object>();
		logger.info(file.getName());
		logger.info(file.getOriginalFilename());
		logger.info(file.getSize()+"");
		LayuiResponse response = new LayuiResponse();
		FileInfo fileInfo = new FileInfo(file.getInputStream(), file.getOriginalFilename(), file.getSize());
		String uniqueCode = fileManage.uploadFileToFileManage(fileInfo);
		String url = fileManage.getDownloadURLStr(uniqueCode);

		response.setFileName(file.getOriginalFilename());
		if(StringUtils.isEmpty(uniqueCode)) {
			response.setCode(1);
		}else {
			response.setUniqueCode(uniqueCode);
			response.setSize(getPrintSize(file.getSize()));
			response.setFileExtensionName(originalFilename.substring(originalFilename.lastIndexOf(".")+1,originalFilename.length()));
			response.setFileUrl(url);
			map.put("code", 0);	//0表示上传成功
			map.put("msg","上传成功"); //提示消息
			//src返回图片上传成功后的下载路径，这里直接给绝对路径
			map2.put("src", url);
			map2.put("title", originalFilename);
			map.put("data", map2);
			return map;
		}
		return response;
	}
	/**
	 * 字节转kb/mb/gb
	 * @param size
	 * @return
	 */
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

	/**
	 * 
	
	 * <p>Title: download</p>  
	
	 * <p>Description: 下载文件</p>  
	
	 * @param uniqueCode
	 * @param
	 * @param resp
	 * @throws Exception
	 */
	@GetMapping("/download/{uniqueCode}")
	@ApiOperation("下载文件")
	public void download(@PathVariable String uniqueCode, HttpServletResponse resp)
			throws Exception {
		try{
			String webUrl = fileManage.getDownloadURLStr(uniqueCode);
			URL url = new URL(webUrl);
			InputStream inputStream = url.openStream();
			OutputStream outputStream = resp.getOutputStream();
			String fileName = FileUtil.getFileName(fileManage.getFileManageRequestProxy(), uniqueCode);
			resp.setContentType("application/x-download");
			resp.addHeader("Content-Disposition", "attachment;filename="+fileName);
			IOUtils.copy(inputStream, outputStream);
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
	}
	
	/**
	 * 
	
	 * <p>Title: getDownLoadUrl</p>  
	
	 * <p>Description: 获取下载链接</p>  
	
	 * @param uniqueCode
	 * @param resp
	 * @throws IOException
	 */
	@GetMapping("/getDownloadUrl/{uniqueCode}")
	@ApiOperation("获取下载链接")
	public void getDownLoadUrl(@PathVariable String uniqueCode, HttpServletResponse resp) throws IOException {
		String url = fileManage.getDownloadURLStr(uniqueCode);
		resp.getWriter().write(url);
	}

	@PostMapping("/editUpload")
	@ResponseBody
	public Object uploadEdit(MultipartFile file) throws Exception {
		String originalFilename = file.getOriginalFilename();
		logger.info(file.getName());
		logger.info(file.getOriginalFilename());
		logger.info(file.getSize()+"");

		FileInfo fileInfo = new FileInfo(file.getInputStream(), file.getOriginalFilename(), file.getSize());
		String uniqueCode = fileManage.uploadFileToFileManage(fileInfo);
		String url = fileManage.getDownloadURLStr(uniqueCode);

		LayuiResponse response = new LayuiResponse();
		response.setFileName(file.getOriginalFilename());
		if(StringUtils.isEmpty(uniqueCode)) {
			response.setCode(1);
		}else {
			Map<String,Object> map = new HashMap<String,Object>();
			Map<String,Object> map2 = new HashMap<String,Object>();
			map.put("code", 0);	//0表示上传成功
			map.put("msg","上传成功"); //提示消息
			//src返回图片上传成功后的下载路径，这里直接给绝对路径
			map2.put("src", url);
			map2.put("title", originalFilename);
			map.put("data", map2);
			return map;
		}
		return response;
	}

	/**
	 * layui富文本图片上传
	 * 阿里云oss对象存储进行保存
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/photoupload")
	public Object myphotoupload(HttpServletRequest request) {
		String fileNames = "";
		String url="";
		LayuiResponse response = new LayuiResponse();
		try {
			StandardMultipartHttpServletRequest req = (StandardMultipartHttpServletRequest) request;
			Iterator<String> iterator = req.getFileNames();
			while (iterator.hasNext()) {
				MultipartFile file = req.getFile(iterator.next());
				fileNames = file.getOriginalFilename();
				InputStream inputStream = file.getInputStream();
				// 把图片读入到内存中
				BufferedImage bufImg = ImageIO.read(inputStream);
				// 压缩代码
				// 存储图片文件byte数组
				ByteArrayOutputStream bos = new ByteArrayOutputStream();
				System.out.println(bufImg.getWidth());
				System.out.println(bufImg.getHeight());
				//防止图片变红
				BufferedImage newBufferedImage = new BufferedImage(bufImg.getWidth()-100, bufImg.getHeight()-100,
				BufferedImage.TYPE_INT_RGB);
				newBufferedImage.createGraphics().drawImage(bufImg, 0, 0, Color.WHITE, null);
				//先转成jpg格式来压缩,然后在通过OSS来修改成源文件本来的后缀格式
				ImageIO.write(newBufferedImage,"jpg",bos);
				//获取输出流
				inputStream = new ByteArrayInputStream(bos.toByteArray());
				Date expiration = new Date(new Date().getTime() + 3600l * 1000 * 24 * 365 * 10);
				// 创建OSSClient实例
				OSS ossClient= new OSSClientBuilder().build(ENDPOINT, ACCESSKEYID, ACCESSKEYSECRET);
//				OSSClient ossClient = new OSSClient(ENDPOINT, ACCESSKEYID, ACCESSKEYSECRET);
				// meta设置请求头
				ObjectMetadata meta = new ObjectMetadata();
				meta.setContentType("image/jpg");
				// 上传文件流
				PutObjectResult putObjectResult = ossClient.putObject(BUCKETNAME, KEY + fileNames, inputStream, meta);
				url = ossClient.generatePresignedUrl(BUCKETNAME, KEY+fileNames, expiration).toString();
				ossClient.shutdown();
			}
			Map<String,Object> map = new HashMap<String,Object>();
			Map<String,Object> map2 = new HashMap<String,Object>();
			map.put("code", 0);	//0表示上传成功
			map.put("msg","上传成功"); //提示消息
			//src返回图片上传成功后的下载路径，这里直接给绝对路径
			map2.put("src", url);
			map2.put("title", fileNames);
			map.put("data", map2);
			return map;

		} catch (IOException e) {
			e.printStackTrace();
		}
		response.setCode(1);
		return response;
	}

	@ResponseBody
	@RequestMapping(value = "/photouploadUrl")
	public Object upload(HttpServletRequest request,MultipartFile file) {
		StandardMultipartHttpServletRequest req = (StandardMultipartHttpServletRequest) request;
		Iterator<String> iterator = ((StandardMultipartHttpServletRequest) req).getFileNames();
		while (iterator.hasNext()) {
			file = req.getFile(iterator.next());
		}
		return ossUtils.upload(file);
	}

}

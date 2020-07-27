/**  
 * <p>Title: UEditorServlet.java</p>  
 * <p>Description: </p>   
 * <p>Company: www.vingsoft.com</p> 
 *
 * @author mrtang
 * @date Mar 8, 2019  
 * @version 1.0  
 *
 */
package com.vingsoft.servlet;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.baidu.ueditor.ActionEnter;
import com.baidu.ueditor.entity.UeditorReturn;
import com.baidu.ueditor.utils.UeditorTools;
import com.vingsoft.fileManage.core.FileManage;

/**
 * <p>
 * Title: UEditorServlet
 * </p>
 * <p>
 * Description: 百度编辑器文件上传
 * </p>
 *
 * @author mrtang
 * @date Mar 8, 2019
 *
 */

@WebServlet(name = "UEditorServlet", urlPatterns = "/UEditor")
public class UEditorServlet extends HttpServlet {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	@Autowired
	private FileManage fileManage;

	/**
	 * 允许上传的图片格式 [".png", ".jpg", ".jpeg", ".gif", ".bmp"]
	 */
	public final List<String> imageTypes = Arrays.asList("JPG", "PNG", "GIF", "JPEG", "BMP");
	/**
	 * 允许上传的视频格式 [ ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
	 * ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".wav" ]
	 */
	public final List<String> videoTypes = Arrays.asList("FLV", "SWF", "MKV", "AVI", "RM", "RMVB", "MPEG", "MPG", "OGG",
			"OGV", "MOV", "WMV", "MP4", "WEBM", "MP3", "WAV", "WAV");
	/**
	 * 允许上传的视频格式 [ ".png", ".jpg", ".jpeg", ".gif", ".bmp", ".flv", ".swf", ".mkv",
	 * ".avi", ".rm", ".rmvb", ".mpeg", ".mpg", ".ogg", ".ogv", ".mov", ".wmv",
	 * ".mp4", ".webm", ".mp3", ".wav", ".mid", ".rar", ".zip", ".tar", ".gz",
	 * ".7z", ".bz2", ".cab", ".iso", ".doc", ".docx", ".xls", ".xlsx", ".ppt",
	 * ".pptx", ".pdf", ".txt", ".md", ".xml" ]
	 */
	public final List<String> fileTypes = Arrays.asList("PNG", "JPG", "JPEG", "GIF", "BMP", "FLV", "SWF", "MKV", "AVI",
			"RM", "RMVB", "MPEG", "MPG", "OGG", "OGV", "MOV", "WMV", "MP4", "WEBM", "MP3", "WAV", "MID", "RAR", "ZIP",
			"TAR", "GZ", "7Z", "BZ2", "CAB", "ISO", "DOC", "DOCX", "XLS", "XLSX", "PPT", "PPTX", "PDF", "TXT", "MD",
			"XML");

	/**
	 * 当前上传文件格式
	 */
	public String fileType = null;

	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doPost(req, resp);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) {
		try {
			String action = request.getParameter("action");
			if ("config".equals(action)) { // 如果是初始化
				request.setCharacterEncoding("utf-8");
				response.setHeader("Content-Type", "text/html");

				String rootPath = request.getSession().getServletContext().getRealPath("/");
				String exec = new ActionEnter(request, rootPath).exec();

				PrintWriter writer = response.getWriter();
				writer.write(exec);
				writer.flush();
				writer.close();
			} else if ("uploadimage".equals(action) || "uploadvideo".equals(action) || "uploadfile".equals(action)) {

				response.setContentType("text/html;charset=UTF-8");
				UeditorReturn rui = null;// 这个是UEditor需要的返回值内容，UEditor要的返回值需要封装成Json格式
				// 获取文件
				File imageFile = UeditorTools.getUploadFile(request);

				// 现在获取了File接下来要上传到文件服务器
				// 判断文件是否为图片文件
				fileType = UeditorTools.getFileType(imageFile).toUpperCase();
				if (imageTypes.contains(fileType) || videoTypes.contains(fileType) || fileTypes.contains(fileType)) {
					rui = UeditorTools.uploadFileToFileService(rui, imageFile, fileManage);
				} else {
					rui = new UeditorReturn();
					rui.setTitle(imageFile.getName());// 这里需要设置文件名称如：xxx.jpg
					rui.setOriginal(imageFile.getName());// 这里需要设置文件名称如：xxx.jpg
					rui.setState("FAIL");// 这里上传成功的话一定要设置大写的 SUCCESS，失败还没测试，猜应该是FAIL，回头再去官网找找
				}
				String result = JSON.toJSONString(rui);// 这边就是为了返回给UEditor做的格式转换
				response.getWriter().write(result);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}

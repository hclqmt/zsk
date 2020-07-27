package com.baidu.ueditor.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FilenameUtils;
import org.apache.log4j.Logger;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.baidu.ueditor.entity.UeditorReturn;
import com.vingsoft.fileManage.core.FileManage;
import com.vingsoft.fileManager.client.FileInfo;

/**
 * 百度编辑器工具类
 * 获取文件类型有些人根据文件名直接获取后缀名，<br>
 * 其实这种做法是错误的，会造成很多错误和麻烦无法获取真实的文件类型，<br>
 * 下面的方法是根据读取文件头信息获取真实文件类型的方法
 * @author MrTang
 *
 */
public class UeditorTools {

	public static Logger log = Logger.getLogger(UeditorTools.class);
	
	public final static Map<String, String> FILE_TYPE_MAP = new HashMap<String, String>();              
    
	/*-----------------------------目前可以识别的类型----------------------------*/  
	private static void getAllFileType() {
		FILE_TYPE_MAP.put("jpg", "FFD8FF"); // JPEG
		FILE_TYPE_MAP.put("png", "89504E47"); // PNG
		FILE_TYPE_MAP.put("gif", "47494638"); // GIF
		FILE_TYPE_MAP.put("tif", "49492A00"); // TIFF
		FILE_TYPE_MAP.put("bmp", "424D"); // Windows Bitmap
		FILE_TYPE_MAP.put("dwg", "41433130"); // CAD
		FILE_TYPE_MAP.put("html", "68746D6C3E"); // HTML
		FILE_TYPE_MAP.put("rtf", "7B5C727466"); // Rich Text Format
		FILE_TYPE_MAP.put("xml", "3C3F786D6C");
		FILE_TYPE_MAP.put("zip", "504B0304");
		FILE_TYPE_MAP.put("rar", "52617221");
		FILE_TYPE_MAP.put("psd", "38425053"); // PhotoShop
		FILE_TYPE_MAP.put("eml", "44656C69766572792D646174653A"); // Email
																	// [thorough
																	// only]
		FILE_TYPE_MAP.put("dbx", "CFAD12FEC5FD746F"); // Outlook Express
		FILE_TYPE_MAP.put("pst", "2142444E"); // Outlook
		FILE_TYPE_MAP.put("office", "D0CF11E0"); // office类型，包括doc、xls和ppt
		FILE_TYPE_MAP.put("mdb", "000100005374616E64617264204A"); // MS Access
		FILE_TYPE_MAP.put("wpd", "FF575043"); // WordPerfect
		FILE_TYPE_MAP.put("eps", "252150532D41646F6265");
		FILE_TYPE_MAP.put("ps", "252150532D41646F6265");
		FILE_TYPE_MAP.put("pdf", "255044462D312E"); // Adobe Acrobat
		FILE_TYPE_MAP.put("qdf", "AC9EBD8F"); // Quicken
		FILE_TYPE_MAP.put("pwl", "E3828596"); // Windows Password
		FILE_TYPE_MAP.put("wav", "57415645"); // Wave
		FILE_TYPE_MAP.put("avi", "41564920");
		FILE_TYPE_MAP.put("ram", "2E7261FD"); // Real Audio
		FILE_TYPE_MAP.put("rm", "2E524D46"); // Real Media
		FILE_TYPE_MAP.put("mpg", "000001BA"); //
		FILE_TYPE_MAP.put("mov", "6D6F6F76"); // Quicktime
		FILE_TYPE_MAP.put("asf", "3026B2758E66CF11"); // Windows Media
		FILE_TYPE_MAP.put("mid", "4D546864"); // MIDI (mid)
	}  
	   
	/**
	 * 通过读取文件头部获得文件类型
	 * 
	 * @param file
	 * @return 文件类型
	 * @throws BaseException
	 */
	public static String getFileType(File file) {
		getAllFileType();
		String fileExtendName = null;
		FileInputStream is;
		try {
			is = new FileInputStream(file);
			byte[] b = new byte[16];
			is.read(b, 0, b.length);
			String filetypeHex = String.valueOf(bytesToHexString(b));
			Iterator<Entry<String, String>> entryiterator = FILE_TYPE_MAP
					.entrySet().iterator();
			while (entryiterator.hasNext()) {
				Entry<String, String> entry = entryiterator.next();
				String fileTypeHexValue = entry.getValue();
				if (filetypeHex.toUpperCase().startsWith(fileTypeHexValue)) {
					fileExtendName = entry.getKey();
					if (fileExtendName.equals("office")) {
						fileExtendName = getOfficeFileType(is);
					}
					is.close();
					break;
				}
			}

			// 如果不是上述类型，则判断扩展名
			if (fileExtendName == null) {
				String fileName = file.getName();
				// 如果无扩展名，则直接返回空串
				if (-1 == fileName.indexOf(".")) {
					return "";
				}
				// 如果有扩展名，则返回扩展名
				return fileName.substring(fileName.indexOf(".") + 1);
			}
			is.close();

		} catch (Exception exception) {
			log.error(exception.getMessage());
		}
		return fileExtendName;
	}
	   
	/**
	 * 判断office文件的具体类型
	 * 
	 * @param fileInputStream
	 * @return office文件具体类型
	 * @throws BaseException
	 */
	private static String getOfficeFileType(FileInputStream fileInputStream) {
		String officeFileType = "doc";
		byte[] b = new byte[512];
		try {
			fileInputStream.read(b, 0, b.length);
			String filetypeHex = String.valueOf(bytesToHexString(b));
			String flagString = filetypeHex
					.substring(992, filetypeHex.length());
			if (flagString.toLowerCase().startsWith("eca5c")) {
				officeFileType = "doc";
			} else if (flagString.toLowerCase().startsWith("fdffffff09")) {
				officeFileType = "xls";

			} else if (flagString.toLowerCase().startsWith("09081000000")) {
				officeFileType = "xls";
			} else {
				officeFileType = "ppt";
			}

		} catch (Exception exception) {
			log.error(exception.getMessage());
		}
		return officeFileType;
	}
	    
	/**
	 * 获得文件头部字符串
	 * 
	 * @param src
	 * @return
	 */
	private static String bytesToHexString(byte[] src) {
		StringBuilder stringBuilder = new StringBuilder();
		if (src == null || src.length <= 0) {
			return null;
		}
		for (int i = 0; i < src.length; i++) {
			int v = src[i] & 0xFF;
			String hv = Integer.toHexString(v);
			if (hv.length() < 2) {
				stringBuilder.append(0);
			}
			stringBuilder.append(hv);
		}
		return stringBuilder.toString();
	} 
	
	/**
	 * 获取上传文件
	 * @param request
	 * @return
	 */
	public static File getUploadFile(HttpServletRequest request){
		File imageFile = null;
		try {
			// 转型为MultipartHttpRequest：
//			MultipartHttpServletRequest multipartRequest=(MultipartHttpServletRequest) request;
			MultipartResolver resolver = new CommonsMultipartResolver(request.getSession().getServletContext());
	        MultipartHttpServletRequest multipartRequest = resolver.resolveMultipart(request);
			// 获得文件：
			MultipartFile file =multipartRequest.getFile("upfile"); //UEditor传到后台的是这个upfile，其他的文件上传，应该也差不多是这个，还没去研究，断点一下就知道了
			// 写入文件
			String fileName = file.getOriginalFilename();

			File path = new File(ResourceUtils.getURL("classpath:").getPath());
			if(!path.exists()) {
				path = new File("");
			}
			File upload = new File(path.getAbsolutePath(),"static/upload/");
			if(!upload.exists()) {
				upload.mkdirs();
			}
			imageFile = new File(path.getAbsolutePath(),"static/upload/"+fileName);
			file.transferTo(imageFile);
		} catch (Exception e) {
			log.error(e.getMessage());
		}
		return imageFile;
	} 
	
	/**
	 * 上传文件到文件服务器
	 * @param rui		上传返回数据实体类
	 * @param imageFile	上传文件
	 * @param fmrp		文件服务器代理
	 * @return
	 * @throws FileNotFoundException
	 * @throws IOException
	 */
	public static UeditorReturn uploadFileToFileService(UeditorReturn rui,
			File imageFile,FileManage fileManage) throws FileNotFoundException, IOException {
		
		if(imageFile!=null){
			rui = new UeditorReturn();
			rui.setTitle(imageFile.getName());//这里需要设置文件名称如：xxx.jpg
			rui.setOriginal(imageFile.getName());//这里需要设置文件名称如：xxx.jpg
			rui.setSize(imageFile.length());
			rui.setType(FilenameUtils.getExtension(imageFile.getName()));
			
			try {
				// 上传文件
				InputStream in = new FileInputStream(imageFile);//实例化FileInputStream
				FileInfo info = new FileInfo();
				info.setFileName(imageFile.getName());
				info.setIn(in);
				info.setFileLength(imageFile.length());
				String uniqueCode = fileManage.uploadFileToFileManage(info);
				String url = fileManage.getDownloadURLStr(uniqueCode);
				rui.setState("SUCCESS");//这里上传成功的话一定要设置大写的 SUCCESS，失败还没测试，猜应该是FAIL，回头再去官网找找
				rui.setUrl(url);//这里是设置返回给UEditor的图片地址
			} catch (Exception e) {
				rui.setState("FAIL");
			}
			// 判断临时存放的文件是否存在
			if (imageFile.exists()) {
				// 删除临时存放的文件
				imageFile.delete();
			}
		}
		return rui;
	}
	
}

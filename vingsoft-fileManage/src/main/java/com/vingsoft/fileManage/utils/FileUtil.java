package com.vingsoft.fileManage.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

import org.apache.log4j.Logger;

import com.vingsoft.core.exception.BizExceptionEnum;
import com.vingsoft.core.exception.BussinessException;
import com.vingsoft.fileManager.client.FileManageRequestProxy;

public class FileUtil {

	private static Logger logger = Logger.getLogger(FileUtil.class);

	// 图片后缀定义
	public final static String picArr = ",JPG,JPEG,PNG,GIF,BMP,";

	/**
	 * InputStream转String
	 * 
	 * @param is
	 * @param encoding
	 * @return
	 */
	public static String inputStreamToString(InputStream is, String encoding) {

		StringBuffer out = new StringBuffer();
		try {
			InputStreamReader inread = new InputStreamReader(is, encoding);

			char[] b = new char[4096];
			for (int n; (n = inread.read(b)) != -1;) {
				out.append(new String(b, 0, n));
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		return out.toString();
	}

	/**
	 * 判断文件服务器中是否为图片文件
	 * 
	 * @return
	 */
	public static boolean isPic(FileManageRequestProxy fileManageRequestProxy, String uniqueCode) {
		boolean flag = false;
		try {
			String path = fileManageRequestProxy.getFileInfoURL(uniqueCode);// 获取文件访问信息路径
			URL url = new URL(path);
			InputStream is = url.openStream();
			String fileName = inputStreamToString(is, "UTF-8");
			String hz = fileName.substring(fileName.lastIndexOf(".") + 1);// 获取上传文件的后缀名
			hz = hz.toUpperCase();// 转大写

			// 定义图片格式
			if (picArr.indexOf("," + hz + ",") > -1) {
				flag = true;
			}
			is.close();
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		return flag;
	}

	/**
	 * 
	 * 
	 * <p>
	 * Title: file_ext
	 * </p>
	 * 
	 * <p>
	 * Description: 获取文件扩展名
	 * </p>
	 * 
	 * @param fileManageRequestProxy
	 * @param uniqueCode
	 * @return
	 */
	public static String file_ext(FileManageRequestProxy fileManageRequestProxy, String uniqueCode) {
		String file_ext = "";
		String fileName = getFileName(fileManageRequestProxy, uniqueCode);
		file_ext = fileName.substring(fileName.lastIndexOf(".") + 1);// 获取上传文件的后缀名
		file_ext = file_ext.toLowerCase();
		return file_ext;
	}

	/**
	 * 
	 * 
	 * <p>
	 * Title: getFileName
	 * </p>
	 * 
	 * <p>
	 * Description: 获取文件名
	 * </p>
	 * 
	 * @param fileManageRequestProxy
	 * @param uniqueCode
	 * @return
	 */
	public static String getFileName(FileManageRequestProxy fileManageRequestProxy, String uniqueCode) {
		String fileName = "";
		InputStream is = null;
		try {
			String path = fileManageRequestProxy.getFileInfoURL(uniqueCode);// 获取文件访问信息路径
			URL url = new URL(path);
			is = url.openStream();
			fileName = inputStreamToString(is, "UTF-8");
		} catch (Exception e) {
			logger.error(e.getMessage());
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {
					logger.error(e.getMessage());
				}
			}
		}
		return fileName;
	}

	/**
	 * NIO way
	 */
	public static byte[] toByteArray(String filename) {

		File f = new File(filename);
		if (!f.exists()) {
			logger.error("文件未找到！" + filename);
			throw new BussinessException(BizExceptionEnum.FILE_NOT_FOUND);
		}
		FileChannel channel = null;
		FileInputStream fs = null;
		try {
			fs = new FileInputStream(f);
			channel = fs.getChannel();
			ByteBuffer byteBuffer = ByteBuffer.allocate((int) channel.size());
			while ((channel.read(byteBuffer)) > 0) {
				// do nothing
				// System.out.println("reading");
			}
			return byteBuffer.array();
		} catch (IOException e) {
			throw new BussinessException(BizExceptionEnum.FILE_READING_ERROR);
		} finally {
			try {
				channel.close();
			} catch (IOException e) {
				throw new BussinessException(BizExceptionEnum.FILE_READING_ERROR);
			}
			try {
				fs.close();
			} catch (IOException e) {
				throw new BussinessException(BizExceptionEnum.FILE_READING_ERROR);
			}
		}
	}
}
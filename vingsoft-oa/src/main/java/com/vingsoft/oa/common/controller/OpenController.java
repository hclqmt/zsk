/**
 * All rights Reserved, Designed By www.vingsoft.com
 * @Title:  OpenController.java
 * @Package com.vingsoft.datax.common.controller
 * @Description:    TODO(用一句话描述该文件做什么)
 * @author: 安徽胜利科技
 * @date:   Sep 23, 2019 2:24:46 PM
 * @version V1.0
 * @Copyright: 2019 www.vingsoft.com Inc. All rights reserved.
 * 注意：本内容仅限于安徽胜利科技内部传阅，禁止外泄以及用于其他的商业目
 */
package com.vingsoft.oa.common.controller;

import com.vingsoft.fileManage.core.FileManage;
import com.vingsoft.fileManage.utils.FileUtil;
import com.vingsoft.oa.common.base.BaseController;
import com.vingsoft.oa.open.doc.service.SysDictService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.io.IOUtils;
import org.beetl.sql.core.SQLManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * @ClassName:  OpenController
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author: mrtang
 * @date:   Sep 23, 2019 2:24:46 PM
 *
 * @Copyright: 2019 www.vingsoft.com Inc. All rights reserved.
 * 注意：本内容仅限于安徽胜利科技内部传阅，禁止外泄以及用于其他的商业目
 */

@RestController
@RequestMapping("/api")
@Api(tags="开放接口")
public class OpenController extends BaseController {

	private String PREFIX = "/open/";
	@Autowired
	private FileManage fileManage;
	@Autowired
	private SQLManager sqlManager;
	@Autowired
	private SysDictService sysDictService;




	/**
	 * 提供可以不用登陆就可以用的url-下载,通过文件唯一码
	 * @param fileUniqueCode
	 * @return
	 */
	@GetMapping("/fileDownload/{fileUniqueCode}")
	@ApiOperation(value="文件下载接口")
	public void fileDownload(@PathVariable("fileUniqueCode") String fileUniqueCode, HttpServletResponse response) {

		String webUrl = fileManage.getDownloadURLStr(fileUniqueCode);
		URL url = null;
		try {
			url = new URL(webUrl);
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		InputStream inputStream = null;
		try {
			inputStream = url.openStream();
		} catch (IOException e) {
			e.printStackTrace();
		}
		OutputStream outputStream = null;
		try {
			outputStream = response.getOutputStream();
		} catch (IOException e) {
			e.printStackTrace();
		}

		String fileName = FileUtil.getFileName(fileManage.getFileManageRequestProxy(), fileUniqueCode);
		response.setContentType("application/x-download");
		response.addHeader("Content-Disposition", "attachment;filename="+fileName);
		try {
			IOUtils.copy(inputStream, outputStream);
		} catch (IOException e) {
			e.printStackTrace();
		}


	}

}

package com.vingsoft.fileManage.utils;

import com.aliyun.oss.OSS;
import com.aliyun.oss.model.CannedAccessControlList;
import com.aliyun.oss.model.ObjectMetadata;
import com.aliyun.oss.model.PutObjectResult;
import com.vingsoft.core.response.LayuiResponse;
import com.vingsoft.fileManage.conf.ServerLoadOssAutoConfig;
import net.coobird.thumbnailator.Thumbnails;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * @Auther: hcl
 * @Date: 2020/6/20 10:43
 * @Description:
 */
public class OssUtils {

    private static final Logger log = LoggerFactory.getLogger(OssUtils.class);

    @Value("${aliyun.oss.bucketName}")
    private  String bucketName;
    @Value("${aliyun.oss.dir}")
    private  String dir;

    @Autowired
    private ServerLoadOssAutoConfig serverLoadOssAutoConfig;

    private OSS oss;

    /**
     * 上传文件---去除URL中的？后的时间戳
     *
     * @param file 文件
     * @return 文件的访问地址
     */
    public Object upload(MultipartFile file) {
        oss = serverLoadOssAutoConfig.getOssClient();
//        createBucket(bucketName);
        Object fileName = uploadFile(file, bucketName, dir);
        String fileOssUrl = getImgUrl(fileName.toString(), bucketName, dir);
        int firstChar = fileOssUrl.indexOf("?");
        if (firstChar > 0) {
            fileOssUrl = fileOssUrl.substring(0, firstChar);
        }
        if (fileName instanceof LayuiResponse){
            return fileName;
        }else{
            Map<String,Object> map = new HashMap<String,Object>();
            Map<String,Object> map2 = new HashMap<String,Object>();
            map.put("code", 0);	//0表示上传成功
            map.put("msg","上传成功"); //提示消息
            //src返回图片上传成功后的下载路径，这里直接给绝对路径
            map2.put("src", fileOssUrl);
            map2.put("title", fileName);
            map.put("data", map2);
            return map;
        }

    }

    /**
     * 上传到OSS服务器 如果同名文件会覆盖服务器上的
     *
     * @param file       文件
     * @param bucketName 桶名
     * @param dir        文件夹
     * @return 文件的访问地址
     */
    private Object uploadFile(MultipartFile file, String bucketName, String dir) {
        LayuiResponse response = new LayuiResponse();
        //设置统一图片后缀名
        String suffixName;

        //存在oss上的名称
        String fileName;

        //获取图片文件名(不带扩展名的文件名)
        String prefixName = getFileNameWithoutEx(file.getOriginalFilename());

        //获取图片后缀名,判断如果是png的话就不进行格式转换,因为Thumbnails存在转png->jpg图片变红bug
        String suffixNameOrigin = getExtensionName(file.getOriginalFilename());

        if ("png".equals(suffixNameOrigin)) {
            suffixName = "png";
        } else {
            suffixName = "jpg";
        }

        //图片存储文件夹
        String filePath = "resources/images";

        //图片在项目中的地址(项目位置+图片名,带后缀名)
        String contextPath = filePath + prefixName + "." + suffixName;
        //存的项目的中模版图片
        File tempFile = null;
        //上传时从项目中拿到的图片
        File f = null;
        InputStream inputStream = null;
        try {
            //图片在项目中的地址(项目位置+图片名,带后缀名)
            tempFile = new File(contextPath);
            if (!tempFile.exists()) {
                //生成图片文件
                FileUtils.copyInputStreamToFile(file.getInputStream(), tempFile);
            }
            /*
             * size(width,height) 若图片横比1920小，高比1080小，不变
             * 若图片横比1920小，高比1080大，高缩小到1080，图片比例不变 若图片横比1920大，高比1080小，横缩小到1920，图片比例不变
             * 若图片横比1920大，高比1080大，图片按比例缩小，横为1920或高为1080
             * 图片格式转化为jpg,质量不变
             */
            BufferedImage image = ImageIO.read(file.getInputStream());
            if (image.getRaster().getWidth()>800 || image.getRaster().getHeight()>500) {
                if (!"png".equals(suffixName)) {
                    Thumbnails.of(contextPath).size(600, 300).outputQuality(1f).outputFormat("jpg").toFile(contextPath);
                } else {
                    Thumbnails.of(contextPath).size(600, 300).outputQuality(1f).toFile(contextPath);
                }
            } else {
                if (!"png".equals(suffixName)) {
                    Thumbnails.of(contextPath).outputQuality(1f).scale(0.8f).outputFormat("jpg").toFile(contextPath);
                } else {
                    Thumbnails.of(contextPath).outputQuality(1f).scale(0.8f).toFile(contextPath);
                }
            }

            //获取压缩后的图片
            f = new File(contextPath);
            inputStream = new FileInputStream(f);

            //设置图片存储在oss上的名字
            fileName = prefixName + "." + suffixName;

            //上传图片到OSS,返回图书路径
            String resultUrl = uploadImg2Oss(inputStream, dir, fileName);
            return resultUrl;


        } catch (Exception e) {
            log.error("{}", "上传文件失败");
            response.setCode(1);
            return response;
        }
    }

    /**
     * 上传到oss
     * @param inputStream
     * @param folderPath
     * @param fileName
     * @return
     * @throws Exception
     */
    public  String uploadImg2Oss(InputStream inputStream, String folderPath, String fileName) throws Exception {
        LayuiResponse response = new LayuiResponse();
        String result = "";
        // 创建上传Object的Metadata
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(inputStream.available());
        //指定该Object被下载时的网页的缓存行为
        metadata.setCacheControl("no-cache");
        //指定该Object下设置Header
        metadata.setHeader("Pragma", "no-cache");
        //文件的MIME，定义文件的类型及网页编码，决定浏览器将以什么形式、什么编码读取文件。如果用户没有指定则根据Key或文件名的扩展名生成，
        //如果没有扩展名则填默认值application/octet-stream
        metadata.setContentType(getContentType(fileName));
        //指定该Object被下载时的名称（指示MINME用户代理如何显示附加的文件，打开或下载，及文件名称）
        metadata.setContentDisposition("inline;filename=" + fileName);
        String resultUrl =dir+ fileName;
        // 上传文件
        PutObjectResult putResult =oss.putObject(bucketName, resultUrl, inputStream, metadata);
        // 设置文件的访问权限为公共读。
        oss.setObjectAcl(bucketName, resultUrl, CannedAccessControlList.PublicRead);
        if (!"".equals(putResult.getETag())) {
            result = resultUrl;
            log.info("上传后的图片MD5数字唯一签名:" + putResult.getETag()); //可以用来验证上传的资源是否为同一个(暂时没用到)
            log.info("上传阿里云OSS服务器成功");

        } else {
            log.error("上传阿里云OSS服务器异常");
        }
        inputStream.close();
        oss.shutdown();
        return result;
    }

    /**
     * 获得文件路径
     *
     * @param fileUrl    文件的URL
     * @param bucketName 桶名
     * @param dir        文件夹
     * @return 文件的路径
     */
    private String getImgUrl(String fileUrl, String bucketName, String dir) {
        if (StringUtils.isEmpty(fileUrl)) {
            log.error("{}", "文件地址为空");
            throw new RuntimeException("文件地址为空");
        }
        String[] split = fileUrl.split("/");

        URL url =
                oss.generatePresignedUrl(
                        bucketName, dir + split[split.length - 1]
                        , DateUtils.addDays(new Date(), 365 * 10));
        if (url == null) {
            log.error("{}", "获取oss文件URL失败");
        }
        return url.toString();
    }

    /**
     * 获得文件扩展名
     * @param filename
     * @return
     */
    public  String getExtensionName(String filename) {
        if ((filename != null) && (filename.length() > 0)) {
            int dot = filename.lastIndexOf('.');
            if ((dot > -1) && (dot < (filename.length() - 1))) {
                return filename.substring(dot + 1);
            }
        }
        return filename;
    }

    /**
     * 获得不带扩展名的文件名
     * @param filename
     * @return
     */
    private  String getFileNameWithoutEx(String filename) {
        if ((filename != null) && (filename.length() > 0)) {
            int dot = filename.lastIndexOf('.');
            if ((dot > -1) && (dot < (filename.length()))) {
                return filename.substring(0, dot);
            }
        }
        return filename;
    }

    /**
     * 判断OSS服务文件上传时文件的contentType
     *
     * @param filenameExtension 文件后缀
     * @return 后缀
     */
    private  String getContentType(String filenameExtension) {
        if (filenameExtension.equalsIgnoreCase("bmp")) {
            return "image/bmp";
        }
        if (filenameExtension.equalsIgnoreCase("gif")) {
            return "image/gif";
        }
        if (filenameExtension.equalsIgnoreCase("jpeg")
                || filenameExtension.equalsIgnoreCase("jpg")
                || filenameExtension.equalsIgnoreCase("png")) {
            return "image/jpeg";
        }
        if (filenameExtension.equalsIgnoreCase("html")) {
            return "text/html";
        }
        if (filenameExtension.equalsIgnoreCase("txt")) {
            return "text/plain";
        }
        if (filenameExtension.equalsIgnoreCase("vsd")) {
            return "application/vnd.visio";
        }
        if (filenameExtension.equalsIgnoreCase("pptx") || filenameExtension.equalsIgnoreCase("ppt")) {
            return "application/vnd.ms-powerpoint";
        }
        if (filenameExtension.equalsIgnoreCase("docx") || filenameExtension.equalsIgnoreCase("doc")) {
            return "application/msword";
        }
        if (filenameExtension.equalsIgnoreCase("xml")) {
            return "text/xml";
        }
        return "image/jpeg";
    }

    /**
     * 当Bucket不存在时创建Bucket
     */
//    private void createBucket(String bucketName) {
//        try {
//            if (!oss.doesBucketExist(bucketName)) {
//                oss.createBucket(bucketName);
//            }
//        } catch (Exception e) {
//            log.error("{}", "创建Bucket失败,请核对Bucket名称(规则：只能包含小写字母、数字和短横线，必须以小写字母和数字开头和结尾，长度在3-63之间)");
//        }
//    }
}
package com.vingsoft.oa.config.beetl;

import org.beetl.core.Configuration;
import org.beetl.core.GroupTemplate;
import org.beetl.core.Template;
import org.beetl.core.resource.StringTemplateResourceLoader;
import org.springframework.context.annotation.Bean;
public class ConfCount {
    public String BeetlString(String confTotalPage){
        try{
            //new一个模板资源加载器
            StringTemplateResourceLoader resourceLoader = new StringTemplateResourceLoader();
            /* 使用Beetl默认的配置。
             * Beetl可以使用配置文件的方式去配置，但由于此处是直接上手的例子，
             * 我们不去管配置的问题，只需要基本的默认配置就可以了。
             */
            Configuration config = Configuration.defaultConfiguration();
            //Beetl的核心GroupTemplate
            GroupTemplate groupTemplate = new GroupTemplate(resourceLoader, config);
            //我们自定义的模板，其中${title}就Beetl默认的占位符
            String testTemplate="<input type=\"hidden\" id=\"confTotalPage\" value=\"${confTotalPage}\">";
            Template template = groupTemplate.getTemplate(testTemplate);
            template.binding("confTotalPage",confTotalPage);
            //渲染字符串
            String str = template.render();
            return str;
        }catch (Exception e){

        }
        return "";
    }

    public static void main(String[] args) throws Exception {
        ConfCount confCount = new ConfCount();
        confCount.BeetlString("xx");
    }
}

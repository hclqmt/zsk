package com.vingsoft.oa.config.quartz;

import org.quartz.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.quartz.CronTriggerFactoryBean;
import org.springframework.scheduling.quartz.MethodInvokingJobDetailFactoryBean;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;
import org.springframework.scheduling.quartz.SimpleTriggerFactoryBean;

import java.util.Date;

@Configuration
public class QuartzConfig {
    private static final String LIKE_TASK_IDENTITY = "KnowledgeTaskQuartz";

    /**
     * 任务实例JobDetail
     * @return
     */
    @Bean
    public JobDetail quartzDetail(){
        return JobBuilder.newJob(KnowledgeTask.class).withIdentity(LIKE_TASK_IDENTITY).storeDurably().build();
    }

    /**
     * 触发器Trigger
     * @return
     */
    @Bean
    public Trigger quartzTrigger(){
        SimpleScheduleBuilder scheduleBuilder = SimpleScheduleBuilder.simpleSchedule()
                .withIntervalInMinutes(3)
//                .withIntervalInHours(2)  //两个小时执行一次
                .repeatForever();
        return TriggerBuilder.newTrigger().forJob(quartzDetail())
                .withIdentity(LIKE_TASK_IDENTITY)
                .withSchedule(scheduleBuilder)
                .build();
    }
    // 配置定时任务1的任务实例
    @Bean(name = "firstJobDetail")
    public MethodInvokingJobDetailFactoryBean firstJobDetail(KnowledgeCrtTask knowledgeCrtTask) {
        MethodInvokingJobDetailFactoryBean jobDetail = new MethodInvokingJobDetailFactoryBean();
        // 是否并发执行
        jobDetail.setConcurrent(false);
        // 为需要执行的实体类对应的对象
        jobDetail.setTargetObject(knowledgeCrtTask);
        // 需要执行的方法
        jobDetail.setTargetMethod("crtTask");
        return jobDetail;
    }
    // 配置触发器1
    @Bean(name = "firstTrigger")
    public SimpleTriggerFactoryBean firstTrigger(JobDetail firstJobDetail) {
        SimpleTriggerFactoryBean trigger = new SimpleTriggerFactoryBean();
        trigger.setJobDetail(firstJobDetail);
        // 设置任务启动延迟
        trigger.setStartDelay(0);
        // 设置定时任务启动时间
        trigger.setStartTime(new Date());
        // 每5秒执行一次
        trigger.setRepeatInterval(5000);
        return trigger;
    }
    // 配置触发器2 + cron表达式
    @Bean(name = "secondTrigger")
    public CronTriggerFactoryBean secondTrigger(JobDetail firstJobDetail) {
        CronTriggerFactoryBean trigger = new CronTriggerFactoryBean();
        trigger.setJobDetail(firstJobDetail);
        // 设置定时任务启动时间
        trigger.setStartTime(new Date());
        // cron表达式
        trigger.setCronExpression("*/7 * * * * ?");
//        trigger.setCronExpression("0 0 1 * * ?");//每天凌晨一点执行
        return trigger;
    }
    /**
     * scheduler 调度器     决定哪些定时任务会执行  -绑定触发器
     */
    @Bean(name = "scheduler")
    public SchedulerFactoryBean schedulerFactory(Trigger secondTrigger) {
        SchedulerFactoryBean bean = new SchedulerFactoryBean();
        // 延时启动，应用启动1秒后
        bean.setStartupDelay(1);
        // 注册触发器
        bean.setTriggers(secondTrigger);
        return bean;
    }
//    每隔5秒执行一次：*/5 * * * * ?
//
//    每隔1分钟执行一次：0 */1 * * * ?
//
//    每天23点执行一次：0 0 23 * * ?
//
//    每天凌晨1点执行一次：0 0 1 * * ?
//
//    每月1号凌晨1点执行一次：0 0 1 1 * ?
//
//    每月最后一天23点执行一次：0 0 23 L * ?
//
//    每周星期天凌晨1点实行一次：0 0 1 ? * L
//
//    在26分、29分、33分执行一次：0 26,29,33 * * * ?
//
//    每天的0点、13点、18点、21点都执行一次：0 0 0,13,18,21 * * ?
}

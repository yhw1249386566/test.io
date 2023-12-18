参见：[此处](https://segmentfault.com/a/1190000015592863) 

1. 当一个新feature来临时
2. owner从master （受保护的）分支checkout 一个feature_dev_branch做开发
3. 开发完成后，提交pull request（PR）请求合并到master
4. **PR自动触发Jenkins，Jenkins触发Sonar分析本次提交的new code**
5. **Sonar将report和issue以comments的方式写到Github PR里，并作为硬性的check point**
6. **Owner对PR进行反复commit直至通过Sonar的分析**
7. 技术leader对PR进行code review并approve后，feature_dev_branch合并到master。
8. Merge触发触发Jenkins自动build，Jenkins触发Sonarqube scan产生report（仅仅生成report）
9. Build成功则进行package的deploy以及后续Automation Testing等流程
10. 交付QA测试
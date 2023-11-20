# FAQ

## you do not have permission to pull from the repository

可能是因为凭据（账户密码没有权限）的问题。去控制面板-用户账户-管理Windows凭据，

删除或修改 git（gitee/github/其他 git 网站的）的凭据，再重新 clone，这样就会让你输入账户密码，从而用你这个新的账户密码作为权限。
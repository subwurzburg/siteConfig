### 統一替換下載地址

1. 將要替換的棋牌(siteConfig.js內部的title)
   加到 lowActive.xlsx 內部的 brand 欄位


2. 如果要異動下載地址 更改index.js

### // 批量修改的Url
### const androidUrl = 'https://mubao-channel.chappystar.com/b1e8d59a74ed325b7944b81173b0f145.apk'
### const iosUrl = 'https://tren567.com/';

3. node index.js

4. 檢查log.txt 有無沒配對到的
### 有的話要再修正 lowActive.xlsx 內部的 brand 欄位
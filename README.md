# 2019ChinaVis_ArtVis 银奖作品
ArtVis works which call for nature protection 
## ChinaVis2019艺术可视化
## 工业革命后的地球 
在线预览：http://129.211.128.212:8080/#/<br>
一、	作品简介<br>
  作品回溯了自1500年至网站打开时，物种、环境、人口的变化。通过物种历史变化趋势,推导在人类不作为的情况下，物种灭绝的时间。通过加速时间，分析发现物种正在逐渐减少，环境正在恶化。希望作品能让更多人注意到人的行为对环境和物种的影响。
自从人类出现以后，特别是工业革命以后，由于人类只注意到具体生物源的实用价值，对其肆意地加以开发，而忽视了生物多样性间接和潜在的价值，使地球生命维持系统受到了人类的威胁，使得地球正在进入第六次大灭绝时期。
作品回溯到世界近现代的三个发展阶段，手工业时代、蒸汽机时代、电气化时代，并发展至今的物种及环境以及灭绝名单的变化情况。
作品主体为被雾笼罩的地球，雾越浓，表示环境越恶劣。并利用不同的图标分别展示北极熊、森林面积、人口数量变化，图标越多，数量越多。提供可交互操作，点击加速按钮，虚拟加速时间，可以观察到物种在N年以后的情况，了解物种被预测灭绝的时间；点击某个州，可查看该州的物种情况，以及物种的详细信息和所受的威胁。
分析发现手工业时代物种灭绝的速度较为缓慢，空气质量高，但从蒸汽时代开始有SO2产生，物种减少的速度加快，灭绝的数量增多。电气时代开始，SO2持续增长，森林面积减少，人口数量急剧增加，臭氧增加，石油开采。

二、	可视化页面设计<br>
 
  视图左侧窗口为引导式交互字幕，引导用户点击视图进行交互。
  视图右侧为每个年份灭绝动植物名单列表。
  视图中心为一个抽象投影的地球，各指示标签实时展示当前时间对应模块数据:
  1.	空气质量:S02，NO2，CO2
  2.	臭氧层空洞大小
  3.	野外陆地森林剩余面积
  4.	北极熊数量
  5.	海平面高度
  6.	世界石油预计剩余储备
  7.	世界人口数量
  8.	世界紧急缺水人口数量
  本文对如下效果进行可视化编码:
  1.	地球外侧云雾运动映射了空气,其颜色灰暗程度映射了空气质量
  2.	外侧紫色层则代表臭氧层,白色缺口为臭氧层空洞
  3.	各州上的人物,树木以及北极熊符号代表其对应的数量,图标符号将随真实数据进行增删

三、	交互以及剧情逻辑说明<br>
  进入系统，跟随引导式字幕，点击开始模拟地球数据，时间从1500年开始，系统时间将飞速加快直至用户打开网站的当前时间,系统时间与现实时间同步。
  在这个过程中，视图中心地球会在对应的年份浮现各个对应模块的真实数据并且随系统时间更新，当系统时间与现实时间同步时，用户可以看到当前时间地球的真实监测数据。
  同时，视图右侧会在时间加速过程中动画弹入在对应年份灭绝的物种名称。
  系统时间与现实同步后,用户有如下交互可选:
  1. 点击视图中心地球不同大陆区域,查看当前区域的濒危以及灭亡动植物，可查看其名单列表视图。
  2. 点击视图右侧名单列表条目,可查看其详细信息视图。
  3. 提供时间加速按钮，用户点击按钮后,系统时间会脱离真实时间进行加速至2050年，所有濒危物种数量将按照之前记录的估计减少速度进行更新,在此过程中，用户可以在视图右侧实时看到当前趋势下，未来将会灭亡的物种名称,同时基于各模块的实时数据也会更新。

四、	数据说明
  作品中物种数据来源于红名单在录的并且数据详细的物种: https://www.iucnredlist.org<br>
  通过计算物种在某一时间内的数量减少情况,粗略估算出物种数量减少速度。
  模块监测数据均从权威网站采集，通过某一年的真实权威报告数据,截止到今年，粗略估计模块监测数据的变化趋势，数据来源如下:<br>
  https://ourworldindata.org<br>
  https://wwf.panda.org<br>
  http://www.poodwaddle.com<br>
  http://www.theworldcounts.com<br>
  https://data.giss.nasa.gov<br>
  https://www.worldometers.info<br>
  数据文件见百度云链接目录文件夹。<br>


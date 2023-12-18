# [audio](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)

## 描述

存在开始和结束标签.

audio元素用于在文档中表示音频内容,它可以包含多个音频资源, 这些音频资源可以使用 src 属性或者[source](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/source)***(参见:<easyElement-2.md - source>)***元素来进行描述； 

浏览器将会选择最合适的一个来使用,对于不支持audio元素的浏览器,audio元素也可以作为浏览器不识别的内容加入到文档中,即 `<audio>这里的文本在浏览器不支持audio元素时会被渲染</audio>`,其效果和video元素怒一样.

## 属性

该元素除了具有全局属性外,还有以下属性:

### src

嵌入的音频的URL. 

该URL应遵从 [HTTP access controls](https://developer.mozilla.org/en-US/docs/HTTP_access_control). 这是一个可选属性；

你可以在audio元素中使用source元素来替代该属性指定嵌入的音频.

### controls

如果设置了该属性,浏览器将提供一个包含声音,播放进度,播放暂停的控制面板,让用户可以控制音频的播放.

若不设置该属性,也没设置autoplay属性,则用户看不到音频也播放不了.

其格式可以为: `controls` 或  `controls="controls"`,这二者是等效的

### volume

音频播放的音量.值从0.0 (无声) 到 1.0 (最大声).

时间偏移量目前是指定为float类型的值,表示偏移的秒数.

**备注：** HTML 5 规范中,时间偏移量值的定义还没有完成,有可能会变更.

### autoplay

布尔属性；如果指定该属性值为true（默认值为"false"）,音频会马上自动开始播放,不会停下来等着数据载入结束;

若为默认值或指定为false,则音频会停下来等着数据载入结束完后再开始播放.

### preload

枚举属性,让开发者自行思考来示意浏览器使用何种加载方式以达到最好的用户体验.可以是以下属性之一：

- none: 示意用户可能不会播放该音频,或者服务器希望节省带宽；换句话说,该音频不会被缓存；
- metadata(默认值): 示意即使用户可能不会播放该音频,但获取元数据 (例如音频长度) 还是有必要的.
- auto: 示意用户可能会播放音频；换句话说,如果有必要,整个音频都将被加载,即使用户不期望使用.
- *空字符串* : 等效于`auto`属性.

假如不设置,默认值就是浏览器定义的了（不同浏览器会选择自己的默认值）, 不过规范建议设置为 metadata.

**使用备注：**

- autoplay 属性优先于 preload 假如用户想自动播放视频,那么很明显浏览器需要下载视频.同时设置autoplay 和 preload属性在规范里是允许的.
- 规范没有强制浏览器去遵循该属性的值；这仅仅只是个提示.

### loop

布尔属性；如果指定,将循环播放音频.

### muted

表示是否静音的布尔值.默认值为false,表示有声音.

### played

一个[`TimeRanges`](https://developer.mozilla.org/zh-CN/docs/Web/API/TimeRanges) 对象,表示所有已播放的音频片段.

### buffered

你可以通过该属性获取已缓冲的资源的时间段信息.该属性包含一个 [`TimeRanges`](https://developer.mozilla.org/zh-CN/docs/Web/API/TimeRanges) 对象.





## 示例

### 简单示例

```html
<audio 
       src="F:\Talk\In China\TXMeet\1.3.0.435\resources\raw\speaker_test_sound.wav" controls>
</audio>
```

<audio 
       src="F:\Talk\In China\TXMeet\1.3.0.435\resources\raw\speaker_test_sound.wav" controls>
</audio>



### 使用source元素的audio元素

```html
<audio controls>
	你的浏览器不支持<code>audio</code>元素.
	<source
		src="F:\Talk\In China\TXMeet\1.3.0.435\resources\raw\speaker_test_sound.wav">
</audio>
```

<audio controls>
	<source
		src="F:\Talk\In China\TXMeet\1.3.0.435\resources\raw\speaker_test_sound.wav">
</audio>

由于即使浏览器不支持audio元素,但是也仍然会渲染audio元素中内容,所以我们只需要向audio元素中添加文本,就可以在不支持audio元素的浏览器播放音频时,给用户提醒.

且我们可以使用多个source元素,适配多个不同的浏览器,只需要为每个source元素添加不同格式但相同内容的资源即可,浏览器只会匹配第一个能使用的元素.

# [video](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)

## 描述

存在开始和结束标签.

video元素用于在HTML或者XHTML文档中嵌入媒体播放器,用于支持文档内的视频播放.

你也可以将 video标签用于音频内容,但是 audio元素可能在用户体验上更合适.

对于video元素中间的内容:`<video>这里的文本</video>`,是针对当浏览器不支持video元素时会显示的文本,和audio元素是一样的.

video元素也同样支持嵌套source元素,同样的,和picture,audio元素一样,这是为了兼容不同的浏览器所做的操作.

因为浏览器并不是都支持相同的[视频格式](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Supported_media_formats),所以你可以在source 元素里提供多个视频源,然后浏览器将会使用它所支持的第一个源.

## 使用说明

- 如果你没有指定 controls 属性,那么视频不会展示浏览器自带的控件(audio元素也是),但你也可以用 JavaScript 和 [`HTMLMediaElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement) API 来创建你自己的控件.

  详情请见[Creating a cross-browser video player](https://developer.mozilla.org/en-US/docs/Web/Apps/Fundamentals/Audio_and_video_delivery/cross_browser_video_player).

- HTMLMediaElement 会激活许多不同的[事件](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Media_events),以便于让你可以控制视频（和音频）内容.

- 你可以用CSS 属性 [object-position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-position) 来调整视频在元素内部的位置,它可以控制视频尺寸适应于元素外框的方式.

- 如果想在视频里展示字幕或者标题,你可以在[track](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/track)元素和 [WebVTT](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API) 格式的基础上使用 JavaScript 来实现.

  详情请见 [Adding captions and subtitles to HTML5 video](https://developer.mozilla.org/en-US/docs/Web/Apps/Fundamentals/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video).

此外这里还有一份很棒的关于[“视频和音频内容”](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content)的初学者材料,收集了很多的基本知识.

## 属性

该元素除了具有全局属性外,还有以下属性:

### src

要嵌到页面的视频的URL。可选；

你也可以使用video块内的source元素来指定需要嵌到页面的视频。

### preload

video元素中的preload属性实际上和audio元素中的preload属性没什么区别.

该枚举属性旨在告诉浏览器作者认为达到最佳的用户体验的方式是什么。可能是下列值之一：

- none: 提示作者认为用户不需要查看该视频，服务器也想要最小化访问流量；换句话说就是提示浏览器该视频不需要缓存。
- metadata: 提示尽管作者认为用户不需要查看该视频，不过抓取元数据（比如：长度）还是很合理的。
- auto: 用户需要这个视频优先加载；换句话说就是提示：如果需要的话，可以下载整个视频，即使用户并不一定会用它。
- *空字符串*：也就代指 auto 值。

假如不设置，默认值就是浏览器定义的了 （即，不同浏览器会选择自己的默认值），即使规范建议设置为 metadata。

### loop

布尔属性；指定后，会在视频结尾的地方，自动返回视频开始的地方。

### muted

布尔属性，指明了视频里的音频的默认设置。设置后，音频会初始化为静音。默认值是false,意味着视频播放的时候音频也会播放 。

- 即可以直接使用 `muted`,则默认值为false=> 视频播放后,音频为静音.
- 或使用 `muted=true`,音频会跟着视频播放,没有设置muted时,这个就是该属性的默认值.
- 或使用 `muted=false`, 这样设置和直接使用 muted是一样的效果.

所以根据以上所说的,其实muted属性只需要设置和不设置即可,设置了属性值就为false,静音状态; 不设置就为true,非静音状态.

### crossorigin

该枚举属性指明抓取相关图片是否必须用到CORS（跨域资源共享）。 [支持CORS的资源](https://developer.mozilla.org/zh-CN/docs/CORS_Enabled_Image) 可在[canvas](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas)元素中被重用，而不会被*污染*。允许的值如下：

- anonymous

  跨域请求（即，使用 Origin: 的HTTP头）会被执行。但是不发送凭证（即，不发送cookie， X.509 证书或者 HTTP Basic 授权）。如果服务器不提供证书给源站点 (不设置 Access-Control-Allow-Origin: HTTP头)，图片会被 *污染* 并且它的使用会受限。

- use-credentials

  跨域请求A cross-origin request (i.e. with `Origin:` HTTP header) 会被执行，且凭证会被发送 (即， 发送一个 cookie, 一个证书和HTTP Basic授权会被执行)。如果服务器不提供证书给源站点 (通过`Access-Control-Allow-Credentials:` HTTP 头)，图像会被 *污染* 且它的使用会受限。

不加这个属性时，抓取资源不会走CORS请求(即，不会发送 `Origin:` HTTP 头)，保证其在canvas元素中使用时不会被污染。

如果指定非法值，会被当作指定了枚举关键字 **anonymous** 一样使用。 查看 [CORS 设置属性](https://developer.mozilla.org/zh-CN/docs/HTML/CORS_settings_attributes) 获取更多信息。

### playsinline

一个布尔属性，标志视频将被“inline”播放，即在元素的播放区域内。

但是,即使没有此属性也并不意味着视频始终是全屏播放的,请看***示例-简单示例***,我并没有设置该属性,但是仍然不会默认是全屏播放,一切全靠浏览器自己实现.

### played

一个 [`TimeRanges`](https://developer.mozilla.org/zh-CN/docs/Web/API/TimeRanges) 对象，指明了视频已经播放的所有范围。

### duration 只读属性

一个双精度浮点值，它指示媒体的持续时间(总长度)，以秒为单位，在媒体的时间线上。

如果元素上没有媒体，或者媒体无效，则返回的值为NaN。

如果媒体没有已知终点*(例如时间未知的实时流、网络广播、来自WebRTC的媒体等等)*，那么这个值就是Infinity。

### 更多属性参见:[MDN-video](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video#Attributes)

## video元素可触发的事件[MDN-video](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video#%E4%BA%8B%E4%BB%B6)



## 示例

### 简单示例

以下示例简单的使用了video元素.

```html
<video 
       src="H:\Multimedia\Adobe\PR\Term Exam\End Of Exam\3177102448myName_美丽的奇观\xx\1.冰与火的极光地带芬兰.mp4">
</video>
```



<video src="H:\Multimedia\Adobe\PR\Term Exam\End Of Exam\3177102448myName_美丽的奇观\xx\1.冰与火的极光地带芬兰.mp4"></video>

# [track](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/track)

## 描述

只存在开始标签。

track元素只能是audio或video元素的子元素,它的作用通常是指定时序文本字幕（或者基于时间的数据），例如自动处理字幕.

也就是给音频或视频添加字幕用的.

## 属性

track元素除了具有全局属性外,还有以下属性:

### src 必须

src属性是track元素的地址。必须是合法的URL(相对/绝对路径/网址)。

该属性必须定义。

### kind

定义了 text track 应该如何使用。如果省略了该属性，默认的 kind 值就是 subtitles。下面是允许的关键字：

- subtitles 默认值

  字幕给观影者看不懂的内容提供了翻译。比如英文电影里非英文的对话框或者文字。

  字幕可能包含额外的内容，通常有附加的背景信息。比如在电影星球大战开头的文字，或者某个场景的日期，时间，还有地点。

- captions

  隐藏式字幕提供了音频的转录甚至是翻译。

  可能包含重要的非言语的信息，比如音乐提示或者音效。可以指定提示音的源文件 (e.g. music, text, character).

  适用于耳聋的用户或者当调成静音的时候。

- descriptions

  视频内容的文本描述。

  适用于失明用户或者当视频不可见的场景。

- chapters

  章节标题用于用户浏览媒体资源的时候。

- metadata

  脚本使用的track。 对用户不可见。

### srclang

track文本数据的语言。它必须是合法的 BCP 47 语言标签。如果 kind 属性被设为 subtitles, 那么srclang 必须定义。

也就是说,如果没有设置kind属性(默认值为subtitles),则srclang属性必须设置.

### default

该属性定义了该track应该启用，除非用户首选项指定了更合适一个track。

每个媒体元素里面只有一个 track 元素可以有这个属性。

### label

当列出可用的text tracks时，给浏览器使用的text track的标题，这种标题是用户可读的。

## 使用说明

track 给媒体元素添加的数据的类型在 kind 属性中设置，属性值可以是 subtitles, captions, descriptions, chapters 或 metadata。

track元素指向当用户请求额外的数据时浏览器公开的包含定时文本的源文件,换一句话来说,即track元素可以依靠src属性链接到一个字幕源文件.

一个media(video或audio)元素的任意两个 track 子元素不能有相同的 kind和srclang和label属性,即至少任意两个track元素这其中的三个属性,至少有一个不同.

### 示例

```html
<video controls poster="/images/sample.gif">
   <source src="sample.mp4" type="video/mp4">
   <source src="sample.ogv" type="video/ogv">
    
   <track kind="captions" 
          src="sampleCaptions.vtt" srclang="en">
    
   <track kind="descriptions"
          src="sampleDescriptions.vtt" srclang="en">
    
   <track kind="chapters" 
          src="sampleChapters.vtt" srclang="en">
    
   <track kind="subtitles" 
          src="sampleSubtitles_de.vtt" srclang="de">
    
   <track kind="subtitles" 
          src="sampleSubtitles_en.vtt" srclang="en">
    
   <track kind="subtitles" 
          src="sampleSubtitles_ja.vtt" srclang="ja">
    
   <track kind="subtitles" 
          src="sampleSubtitles_oz.vtt" srclang="oz">
    
   <track kind="metadata" 
          src="keyStage1.vtt" srclang="en"
          label="Key Stage 1">
    
   <track kind="metadata" 
          src="keyStage2.vtt" srclang="en"
          label="Key Stage 2">
    
   <track kind="metadata" 
          src="keyStage3.vtt" 
          srclang="en"
          label="Key Stage 3">
    
   <!-- Fallback -->
   ...
</video>
```

以上这么多track元素是为了兼容不同浏览器设置的,因为实际上,浏览器只会使用第一匹配到的track元素,其余track元素则忽略.










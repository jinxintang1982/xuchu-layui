layui的栅格将容器进行了12等分预设了4*12种CSS排列类;

一、简单布局：
    1.定义布局<div>：layui-container或layui-fluid;
        class="layui-container"固定宽度，居中显示；
        class="layui-fluid"100%适应屏幕宽度
    2.定义row<div>：class="layui-row"
        可以设定列之间的间距，预设了12种不同尺寸的边距，layui-col-space1，2，4等
    3.定义col<div>：class="layui-col-md3"
        md:可先xs（超小屏幕，如手机）、sm（小屏幕，如平板）、md（桌面中等屏幕）、lg（桌面大型屏幕）；
        *：可选值为1-12，表示所占用的12等分数；如果大于12，多余的列将自动另起一行；
    4.添加内容：<div>XXXX</div>、<input ></input>等，
        设置填充方式(可选)；
            layui-show-*-block	 等于css中的块模式，display: block; 
            layui-show-*-inline	 等于css中的内联模式，display: inline;
            layui-hide-*	     等于css中的隐藏模式，display: none;
        设置列偏移(可选)：
            layui-col-md-offset* 的预设类，从而让列向右偏移。
            <div class="layui-col-md2 layui-col-md-offset4">
                偏移4列
            </div>
    
二、嵌套布局：
    在列元素（layui-col-md*）中插入一个行元素（layui-row），即可完成嵌套。
    <div class="layui-row layui-col-space5">
      <div class="layui-col-md5">
        <div class="layui-row grid-demo">
          <div class="layui-col-md3">
            内部列
          </div>
          <div class="layui-col-md9">
            内部列
          </div>
          <div class="layui-col-md12">
            内部列
          </div>
        </div>
      </div>
      <div class="layui-col-md7">
        <div class="layui-row grid-demo grid-demo-bg1">
          <div class="layui-col-md12">
            内部列
          </div>
          <div class="layui-col-md9">
            内部列
          </div>
          <div class="layui-col-md3">
            内部列
          </div>
        </div>
      </div>
    </div>
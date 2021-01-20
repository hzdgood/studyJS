Array.prototype.indexOf = function (item)   //给数组扩展一个indexOf方法,用来检索是否为"已知元素"       
{
    for (var i = 0; i < this.length; i++)
        if (this[i] == item) return i; return -1;
};
var Site =  //定义一个棋位类       
{
    Create: function (x, y)  //棋位类的构造函数          
    {
        var me = document.createElement("div"); //建一个div对象，将其扩展并封装成棋位。          
        document.body.appendChild(me);  //附加到DOM树，实现棋位的呈现。      
        me.x = x;   //记录棋位的X坐标          
        me.y = y;   //记录棋位的Y坐标         
        me.style.left = x * 23 + "px";  //设置棋位水平方向的绝对位置         
        me.style.top = y * 23 + "px";   //设置棋位垂直方向的绝对位置//      
        var s = ((x - 9) % 9 ? 0 : (x - 9) / 9) + 1 + (((y - 9) % 9 ? 0 : (y - 9) / 9) + 1) * 3; //计算背景式样,这个算法有冗余,简化为下面的算法.          
        var s = parseInt((x - 9) / 9) + 1 + (parseInt((y - 9) / 9) + 1) * 3;    //计算背景式样//         
        me._backStyle = "B" + ((s == 4 && (x / 3) % 2 == 1 && (y / 3) % 2 == 1) ? "X" : s);
        me._backStyle = "B" + (((x / 3) % 2 == 1 && (y / 3) % 2 == 1) ? "X" : s);
        me.Fill = this.Fill;    //关联一个填充棋位的方法。         
        me.Tight = this.Tight;  //关联计算紧气方法。         
        me.Kill = this.Kill;    //关联计算死子方法。           
        me.onclick = this.Play; //绑定onclick事件到Play方法。        
        me.Fill();              //初始填充空子。           
        return me;              //返回棋位对象，其实是一个封装了的div对象。        
    }, Fill: function (dot, going)     //填充棋子的方法,going~~是否"当前步".     
    {
        if (dot == undefined)
            this.className = this._backStyle    //无子，就设置为背景式样。        
        else this.className = (going ? "C" : "D") + dot;  //有子,区别对待"当前步"         
        this.dot = dot;     //保存棋子状态     
    }, Play: function ()        //行棋方法，由onclick事件触发        
    {
        if (this.dot == undefined) //落子点必须为无子状态,否则不处理.       
        {
            var deads = this.Kill(current ^ 1);
            //计算可以杀死的子,current为当前颜色,则current^1为对方颜色              
            if (deads.length == 1 && this == rob) return; //确认的打劫状态后,直接拒绝;如果此步落子可以提不止一子,则不是打劫           
            for (var i = 0; i < deads.length; i++)
                deads[i].Fill();                          //按照死子列清空,one by one     
            if (i == 1)
                rob = deads[0]  //如果此步只提了一个子,记录被提位置为打劫位置.           
            else if (i > 0 || !this.Tight(current)) //这里有一个影响代码效率的判断,对于能产生提子的操做,不需要再判断是否"紧气禁入";此外,如果要引入"变穷为禁"的规则,这里需要改变算法                
                rob = null                                //清打劫位,这个条件是判断,如果能够提多子,或者不是禁止着手,则解除"打劫"状态             
            else return;                                  //这里对应的返回,应该是只有无气禁入点的情况.              
            sound.play();       //落子有声！            
            var step = Tracks[Tracks.length - 1];
            if (step) step.site.Fill(step.site.dot);       //更新此前一"步"的子的位图            
            this.Fill(current, true);                     //填入当前"步"的子               
            Tracks.push(new Step(this, deads));
            current ^= 1;       //用1来异或，正好反转黑白棋子。                    
            var disline = document.getElementById('list');
            disline.value += ((current ? '黑：' : '白：') + Tracks[Tracks.length - 1].site.x + ' ' + Tracks[Tracks.length - 1].site.y + '\n');
            disline.scrollTop = disline.scrollHeight;
        };
    },
    Tight: function (dot)   //计算紧气的块,此时如果dot==undefined,则对应提子的遍历,this指向当前点.      
    {
        var life = this.dot == undefined ? this : undefined; //life为"气"的定义;当前位无子则算一口气,对应落子的遍历,当前位置必然无子.       
        dot = dot == undefined ? this.dot : dot;             //这个逻辑是对应提子的遍历             
        if (dot == undefined)
            return undefined;
        var block = this.dot == undefined ? [] : [this];     //定义的"块",在提子的遍历中,发现子就放入块,再判断有多少"气".         
        var i = this.dot == undefined ? 0 : 1;
        var site = this;
        while (true) {
            for (var dx = -1; dx <= 1; dx++) for (
                var dy = -1; dy <= 1; dy++)
                if (!dx ^ !dy) {
                    link = GetSite(site.x + dx, site.y + dy);
                    if (link)                       //判断目标位置的上下左右,有位则继续,"无位"对应棋盘以外的区域.                   
                        if (link.dot != undefined)  //有子,则判断是否为同色,连"块"                     
                        {
                            if (link.dot == dot && block.indexOf(link) < 0)
                                block.push(link);   //此一段为"块"的遍历,条件是找四周的同色子,找到后判断是否为新"知道","新"则放入"块"          
                        } else if (!life)    //无子,则更新"气"                      
                            life = link
                        else if (life != link)
                            return undefined;   //在提子的遍历中,如果发现有两"气"了,则无须再算                 
                };
            if (i >= block.length)
                break;  //"块"的遍历结束条件为,列表的最后一个对象没有产生新的相邻子.                
            site = block[i]; i++;
        }; return block;   //返回只有一口气的块,在提子的遍历中,这对应了可能被提掉的子列,再去判断是否为"打劫"          
    },
    Kill: function (dot)     //计算杀死的子,目前this指向落子点,dot指向需要判断的死子颜色.      
    {
        var deads = []; //定义死子列           
        for (var dx = -1; dx <= 1; dx++)
            for (var dy = -1; dy <= 1; dy++)
                if (!dx ^ !dy) //异或,有且只有一个为真,可对应到相邻子.         
                {
                    var site = GetSite(this.x + dx, this.y + dy);
                    if (site && (site.dot == dot)) {
                        var block = site.Tight();
                        //分别对上下左右进行遍历,查找被紧气的"块",然后合并成为"死子列"           
                        if (block) deads = deads.concat(block); //concat 合并操作,此操作并未识别"同项",仅以围棋规则判断,对"打劫没有影响".   

                        //如果需要准确的提子数目统计,这里的算法需要更新.        
                    };
                };
        return deads;   //返回可以提子的死子块           
    }
}; //棋位类 Site     
var Board = new Array(19);  //全局的Board数组，表示棋盘。    
var Tracks = [];    //行棋线索数组，数组元素是Step对象。     
var current = 0;    //当前要下的子，0表示黑子，1表示白子，交替。    
var rob = null;     //如果有打劫时，记录打劫位置。   
for (var x = 0; x < 19; x++) {
    Board[x] = new Array(19);
    for (var y = 0; y < 19; y++)
        Board[x][y] = Site.Create(x, y);    //按位置创建棋位对象。  
};
if (navigator.userAgent.indexOf(' MSIE ') > -1) //为IE浏览器构造声音对象   
{
    var sound = document.body.appendChild(document.createElement("bgsound"));
    sound.play = function () { this.src = "play.wav" };
}
else    //为Firefox等其他浏览器构造声音对象       
{
    var sound = document.body.appendChild(document.createElement("span"));
    sound.play = function () { this.innerHTML = "<bgsound src='play.wav'>" };
};
document.body.oncontextmenu = function ()//右键驱动悔棋事件      
{
    var step = Tracks.pop();
    if (step) {
        step.site.Fill(); for (var i = 0; i < step.deads.length; i++)
            step.deads[i].Fill(current); step = Tracks[Tracks.length - 1];
        if (step)
            step.site.Fill(current, true)
        current ^= 1;       //反转黑白棋子。      
    }; return false;   //不弹出菜单。      
};
function GetSite(x, y)  //从棋盘取棋位的函数，越界不抛出异常。      
{
    if (x >= 0 && x < 19 && y >= 0 && y < 19)
        return Board[x][y];
};
function Step(site, deads)   //棋步类，记录每一步棋的状态     
{
    this.site = site;   //记录棋步的位置    
    this.deads = deads; //记录被当前棋步杀死的棋子集合      
};
function PrintWay() //行棋路线 
{
    var str = '', coler = '';
    for (var i = 0; i < Tracks.length; i++) {
        step = Tracks[i]; coler = (i % 2) ? "白" : "黑"; str = str + "第" + (i + 1) + "步" + coler + "方 X" + step.site.x + " Y" + step.site.y + " \n";
    }
    alert(str);
}
document.body.ondblclick = PrintWay;
document.onkeypress = function (event) {
    var k = (window.event ? window.event.keyCode : event.which) - 49; //按'1'可以进入自动摆棋操作,'1'=0x31=49     
    if (k < 0 || k > 1) return;
    for (var x = 0; x < 19; x++)
        for (var y = 0; y < 19; y++)
            Board[x][y].Fill();
    Tracks.length = 0;
    current = 0;
    with (goes[k])
    for (var i = 0; i < length; i += 3)
        Board[charCodeAt(i + 1) - 65][charCodeAt(i) - 65].Fill(charCodeAt(i + 2) - 48);
};
var goes = ["AA0AB0AC1AE0AF1AG1AI0BA0BC1BE0BF0BG1BI0BK1CA1CB1CC1CD0CF0CG1CI0CK1\DA0DB0DC0DD0DE0DF0DG1DH1DI0DJ0DK1EC1ED1EE1EF1EH1EK1FA1FB1FC1FE0FF1FG1FH1FI0FJ0\FK1GA1GB0GC1GE0GF0GG0GG0GH0GI0GJ1HA0HB0HC0HD0HE0HI1HJ1IB1IF1JC1JE1JG1", "AA0AB0AC0AF1AG1AH0AI0AJ0AK1AM0AO0AP0AR0AS0BA0BB0BF1BG1BJ0BK0BL1BM0BR0BS0CA0CB1\CC0CD0CG0CH0CI1CJ0CK0CL1CM0CO1CP0CQ0CR1CS0DA1DB1DC0DD0DE1DF1DH1DI0DJ1DK1DL0DN0\DP1DQ1DR1DS0EB0ED1EE0EG1EI0EK0EM0EO1ER0ES1FB0FC1FE0FF0FG1FN1FP0FR0GA0GF1GH0GJ0\GL0GR0GS0HC0HD0HF0HI0HK0HM0HN1HP0HQ0HR1IA0IB0IC1ID0IE1IK0IL1IM0IQ1IR0IS0JA0JB0\JC1JE1JG1JI0JJ1JK1JL0JM1JN1JO0JQ1JR0JS0KA1KC1KD1KE0KG0KI1KJ0KK0KL0KM0KN0KO1KQ0\KR0KS0LD0LE1LI0LJ1LL0LN1LO0LP0LQ1LR0LS0MD0MG0MI0MJ0MK0ML1MM0MN1MR1MS0NC0NF0NL1\NO0NQ0NR0NS1OB0OC0OG0OL1OO0PA1PB1PC0PD0PI0PJ0PK0PL1PM0PN0PR0QA0QC1QD0QE1QF1QG1\QH1QK1QP0RA0RB0RC0RD1RE1RF0RG0RH1RI0RL0SA0SB0SC0SD0SE0SF0SG0SH0SI1SJ1"];

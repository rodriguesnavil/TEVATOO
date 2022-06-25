import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-uniswap',
  templateUrl: './uniswap.component.html',
  styleUrls: ['./uniswap.component.scss']
})
export class UniswapComponent implements OnInit, AfterViewInit, OnChanges {

  options: any;
  themeSubscription: any;

  settings = {
    actions: false,
    hideSubHeader: true,
    // actions: true,
    columns: {
      name: {
        title:'Attributes',
      },
      value:{
        title:'Value'
      }
    },
  };

  chartsData = [
    {
      "name": "Community members",
      "value": "60"
    },
    {
      "name": "Team",
      "value": "21.27"
    },
    {
      "name": "Investors/share holders",
      "value": "18.04"
    },
    {
      "name": "Advisors",
      "value": "0.69"
    },
  ];

  constructor(
    private theme: NbThemeService
  ) { }

  ngOnInit(): void {

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors = config.variables;
      const echarts: any = config.variables.echarts;
      let legends = [];
      
      this.chartsData.forEach(element => {
        legends.push(element.name);
      })

      console.log(`colors --> ${JSON.stringify(colors)}`)

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          // formatter: '{a} <br/>{b} : {c} ({d}%)',
          formatter: '{a} <br/>{b}: {c}%',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: legends,
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Token distribution',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: this.chartsData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }
  ngAfterViewInit(): void {
   
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }
}
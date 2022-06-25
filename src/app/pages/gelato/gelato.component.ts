import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-gelato',
  templateUrl: './gelato.component.html',
  styleUrls: ['./gelato.component.scss']
})
export class GelatoComponent implements OnInit, AfterViewInit, OnChanges {

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
      "name": "Public sale",
      "value": "4.00"
    },
    {
      "name": "private investors",
      "value": "21.00"
    },
    {
      "name": "future team members",
      "value": "10.00"
    },
    {
      "name": "Founding Team",
      "value": "15.00"
    },
    {
      "name": "Community Development",
      "value": "50.00"
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
import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnChanges {

  options: any;
  themeSubscription: any;

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    selectMode: 'multi',
    // hideSubHeader: true,
    // actions: true,
    columns: {
      attributes: {
        title:'Attributes',
      },
      value:{
        title:'Value'
      }
    },
  };

  chartsData = [
    // {
    //   "attributes": "Community members",
    //   "value": "5"
    // },
    // {
    //   "attributes": "Team",
    //   "value": "5"
    // },
    // {
    //   "attributes": "Investors/share holders",
    //   "value": "5"
    // },
    // {
    //   "attributes": "Advisors",
    //   "value": "5"
    // },
    // {
    //   "attributes": "Future team members",
    //   "value": "5"
    // },
    // {
    //   "attributes": "future developments",
    //   "value": "5"
    // },
    // {
    //   "attributes": "Crowdsale",
    //   "value": "5"
    // },
    // {
    //   "attributes": "public sale",
    //   "value": "5"
    // },
    // {
    //   "attributes": "Staking rewards",
    //   "value": "5"
    // },
    // {
    //   "attributes": "Company Reserve",
    //   "value": "5"
    // },
    // {
    //   "attributes": "Marketing",
    //   "value": "5"
    // },
    // {
    //   "attributes": "Bounty program",
    //   "value": "5"
    // },
    // {
    //   "attributes": "Seed sale",
    //   "value": "5"
    // },
    // {
    //   "attributes": "Strategic sale",
    //   "value": "5"
    // },
    // {
    //   "attributes": "Launchpad sale",
    //   "value": "5"
    // },
    // {
    //   "attributes": "Contingency",
    //   "value": "5"
    // },
    // {
    //   "attributes": "Air drops",
    //   "value": "5"
    // },
    // {
    //   "attributes": "Others",
    //   "value": "5"
    // }
  ];

  constructor(
    private theme: NbThemeService
  ) { }

  ngOnInit(): void {

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      console.log(localStorage.getItem('piData'));

      this.chartsData = JSON.parse(localStorage.getItem('piData'));

      console.log()

      let newArray = [];
      let legends = [];

      if (this.chartsData) {
        this.chartsData.forEach(element => {
          let obj = {
            name: element.attributes,
            value: element.value
          }
          newArray.push(obj);
  
          legends.push(element.attributes);
        });
      }

      

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          // formatter: '{a} <br/>{b} : {c} ({d}%)',
          formatter: '{a} <br/>{b} : {c}',
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
            data: newArray,
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

  addAttribute(event: any) {
    if (this.chartsData === null) {
      this.chartsData = [];
    }
    this.chartsData.push(event.newData);
    console.log(this.chartsData); 
    event.confirm.resolve();
    localStorage.setItem('piData', JSON.stringify(this.chartsData));
    this.ngOnInit();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  ngAfterViewInit(): void {
   
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }
}

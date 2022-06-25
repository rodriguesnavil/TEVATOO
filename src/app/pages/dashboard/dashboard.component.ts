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
    // selectMode: 'multi',
    // hideSubHeader: true,
    // actions: true,
    columns: {
      attributes: {
        title:'Attributes',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              {value: 'Community members', title:'Community members'},
              {value: 'Team', title:'Team'},
              {value: 'Investors/share holders', title:'Investors/share holders'},
              {value: 'Advisors', title:'Advisors'},
              {value: 'Future team members', title:'Future team members'},
              {value: 'future developments', title:'future developments'},
              {value: 'Crowdsale', title:'Crowdsale'},
              {value: 'public sale', title:'public sale'},
              {value: 'Foundation', title:'Foundation'},
              {value: 'Staking rewards', title:'Staking rewards'},
              {value: 'Company Reserve', title:'Company Reserve'},
              {value: 'Marketing', title:'Marketing'},
              {value: 'Bounty program', title:'Bounty program'},
              {value: 'Seed sale', title:'Seed sale'},
              {value: 'Strategic sale', title:'Strategic sale'},
              {value: 'Launchpad sale', title:'Launchpad sale'},
              {value: 'Contingency', title:'Contingency'},
              {value: 'Air drops', title:'Air drops'},
              {value: 'Others', title:'Others'},
              {value: 'Unallocated', title:'unallocated'},
            ],
          },
        }
      },
      value:{
        title:'Value'
      }
    },
  };

  chartsData = [];

  constructor(
    private theme: NbThemeService
  ) { }

  ngOnInit(): void {

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.chartsData = JSON.parse(localStorage.getItem('piData'));

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

      console.log(`chartsdata  ${JSON.stringify(this.chartsData)}`)
      console.log(`legends  ${JSON.stringify(this.chartsData)}`)
      

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          // formatter: '{a} <br/>{b} : {c} ({d}%)',
          formatter: '{a} <br/>{b}: {c}',
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

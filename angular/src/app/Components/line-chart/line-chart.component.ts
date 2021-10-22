// import {OnInit, Component, ElementRef, Input, Injectable} from '@angular/core';
// import Plotly from 'plotly.js-dist';
// import {BehaviorSubject} from 'rxjs';

// @Component({
//   selector: 'app-line-chart',
//   templateUrl: './line-chart.component.html',
//   styleUrls: ['./line-chart.component.css']
// })
// @Injectable({
//   providedIn: 'root'
// })
// export class LineChartComponent implements OnInit {
//   private loading = true;
//   private redrawCooldown = false;
//   private visibleRows = 1;
//   private lastUpdateTime = 0;
//   private lastDatasets: Array<any>;
//   // https://plot.ly/javascript/reference/#layout
//   private layout = {
//     legend: {
//       orientation: 'v',
//       x: 0,
//       y: -0.1,
//       xanchor: 'left',
//       yanchor: 'top',
//       tracegroupgap: 20
//     },
//     margin: {
//       l: 25, r: 25, b: 25, t: 25, pad: 0
//     },
//     xaxis: {
//       showgrid: false,
//       zeroline: false
//     },
//     yaxis: {
//       showline: false
//     },
//     showlegend: true,
//   };

//   private options = {
//     displaylogo: false
//   };

//   constructor(private element: ElementRef) {
//   }

//   @Input()
//   set datasets(datasets: any[]) {
//     /*datasets.subscribe(datasets => {
//       this.lastDatasets = datasets;
//       this.redraw(datasets);
//     });*/
//     this.draw(datasets);
//   }

//   @Input()
//   set finished(isFinished: boolean) {

//     if (isFinished) {
//       this.draw(this.lastDatasets);
//     }
//   }

//   @Input()
//   set something(something: any) {
//     this.redrawLayoutChange();
//   }

//   private redrawLayoutChange() {
//     const node = Plotly.d3
//       .select(this.element.nativeElement)
//       .style({
//         width: '100%',
//         height: '80vh',
//         display: 'block',

//       })
//       .node();

//     Plotly
//       .newPlot(node, [], this.layout, this.options)
//       .then(() => this.loading = false);

//     Plotly.Plots.resize(node);
//   }


//   @Input()
//   set livegraphvisiblerowcount(rows: number) {
//     if (rows < 1) {
//       rows = 1;
//     }
//     this.visibleRows = rows;
//     const node = Plotly.d3
//       .select(this.element.nativeElement)
//       .style({
//         width: '100%',
//         height: this.visibleRows + 'vh',
//         display: 'block',

//       })
//       .node();
//     this.redrawLayoutChange();
//   }

//   ngOnInit() {
//     const node = Plotly.d3
//       .select(this.element.nativeElement)
//       .style({
//         width: '100%',
//         height: (80 / this.visibleRows) + 'vh',
//         display: 'block',

//       })
//       .node();

//     Plotly
//       .newPlot(node, [], this.layout, this.options)
//       .then(() => this.loading = false);

//     window.addEventListener('resize', e => Plotly.Plots.resize(node));
//     document.addEventListener('click', e => Plotly.Plots.resize(node));
//   }

//   draw(datasets: Array<any>) {
//     this.element.nativeElement.data = datasets;
//     requestAnimationFrame(() => {
//       Plotly.redraw(this.element.nativeElement);
//       this.redrawCooldown = false;
//       this.lastUpdateTime = Date.now();
//     });
//   }

//   private redraw(datasets: Array<any>) {
//     if (this.loading) {
//       return;
//     }

//     if (this.redrawCooldown === false && Date.now() - this.lastUpdateTime > 150) {
//       this.redrawCooldown = true;
//       this.draw(datasets);
//     }
//   }
// }

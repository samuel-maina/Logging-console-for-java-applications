import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import moment from 'moment';
var teamOneChart = null;
export const MonthlyChart= ({data}) => {
    var data = data;
    var month= month;
    var year = year;
    var data = data;
    let date = [];//[1,3,3,3,3,3,3,4,5,6,7,7,8,6,4,4,7,7,9,0,7,4,3,7,9,6,8,9,0,5,7,3,8,4,8,3,9,5,0,5,8,1,3,3,3,3,3,3,4,5,6,7,7,8,6,4,4,7,7,9,0,7,4,3,7,9,6,8,9,0,5,7,3,8,4,8,3,9,5,0,5,8]; //[]/["2021","2022","2023","2024","2025","2026","2027"]//,"Xterposx","rhcher","Pacthio","Gerv","h-2ui","elfIo","XioPin","hinder","Xdale","Papetir"];
    let amount =[];// [1,3,3,3,3,3,3,4,5,6,7,7,8,6,4,4,7,7,9,0,7,4,3,7,9,6,8,9,0,5,7,3,8,4,8,3,9,5,0,5,8,1,3,3,3,3,3,3,4,5,6,7,7,8,6,4,4,7,7,9,0,7,4,3,7,9,6,8,9,0,5,7,3,8,4,8,3,9,5,0,5,8];// [120000,150000,100000,170000,145000,40000,79000,45000,22000,34000,21000,32000,21000,43000,40000,79000,45000,22000,34000,21000,32000,21000,43000,34000,21300,20000,65000,34000,21300,20000,65000,40000,79000,45000,22000,34000,21000,32000,21000,43000,34000,21300,20000,65000,120000,150000,100000,170000,145000,40000,79000,45000,22000,34000,21000,32000,21000,43000,40000,79000,45000,22000,34000,21000,32000,21000,43000,34000,21300,20000,65000,34000,21300,20000,65000,40000,79000,45000,22000,34000,21000,32000,21000,43000,34000,21300,20000,65000];
   
        data.map((data) => {
            
          //var x=  moment().month(month).date(item.date);
          //x.year(year);
         //var xy=""
         //xy=x.format('ddd')+"-"+x.format('DD')
                  //.format('ddd,d');
            date.push(data.time);
            amount.push(data.count);
        });

    useEffect (() => {
        const t1ChartEl = document.getElementById("teamOneCanvas");
        if (teamOneChart) {
            teamOneChart.destroy();
        }
        teamOneChart = new Chart(t1ChartEl, {
            
            
            data: {
                labels: [...date],
                datasets: [{
                        label: ["Amount"],
                        type:'bar',
                        data: [...amount],
                        backgroundColor: [
                           ' rgba(249, 166, 62, 0.4)',' rgba(249, 166, 62, 0.5)',' rgba(249, 166, 62, 0.6)',' rgba(249, 166, 62, 0.7)',' rgba(249, 166, 62, 0.8)',' rgba(249, 166, 62, 0.9)',' rgba(249, 166, 62, 1)',
                            'rgba(37, 112, 184, 0.4)','rgba(37, 112, 184, 0.5)','rgba(37, 112, 184, 0.6)','rgba(37, 112, 184, 0.7)','rgba(37, 112, 184, 0.8)','rgba(37, 112, 184, 0.9)','rgba(37, 112, 184, 1)'
                            
                            
                        ],
                        borderColor: [
                         ' rgba(249, 166, 62, 0.4)',' rgba(249, 166, 62, 0.5)',' rgba(249, 166, 62, 0.6)',' rgba(249, 166, 62, 0.7)',' rgba(249, 166, 62, 0.8)',' rgba(249, 166, 62, 0.9)',' rgba(249, 166, 62, 1)',
                            'rgba(37, 112, 184, 0.4)','rgba(37, 112, 184, 0.5)','rgba(37, 112, 184, 0.6)','rgba(37, 112, 184, 0.7)','rgba(37, 112, 184, 0.8)','rgba(37, 112, 184, 0.9)','rgba(37, 112, 184, 1)'
                            
                         
                            
                        ],
                       
                        barPercentage:1.0,borderWidth: 0.5
                    },
                  {
                        label: ["Trend"],
                        type:"line",
                       // data: [...amount],
                        
                        backgroundColor: [
                           'rgba(255, 99, 132, 0.3)',
                           
                      ],
                        borderColor: [
                           'rgba(37, 112, 184, 1)'
                            
                       ],
                        borderWidth: 2,
                        barPercentage:0
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                },
                 maintainAspectRatio:false,
                 animation:false,
                 
                 plugins:{
                title:{
                  display:false,
                  text:'Showing Daily Records by Month for '+moment().format("MMMM - YYYY"),
                  position:'top'
                }}
            }
        });
teamOneChart.canvas.parentNode.style.height="170px";
teamOneChart.canvas.parentNode.style.wdidth="950px";
    })



    return (
            <div class="w-10s0 h-4s0 relative center">
            
                <canvas id="teamOneCanvas" class="ab"></canvas>
            </div>
            );
}

;

export default MonthlyChart;
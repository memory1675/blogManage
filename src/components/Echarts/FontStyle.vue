<template>
    <div id="fontstyle" style="height: 100px;width: 300px;"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import * as echarts from 'echarts';
let { title } = defineProps(['title'])
onMounted(() => {
    var chartDom = document.getElementById('fontstyle');
    var myChart = echarts.init(chartDom);
    var option;
    option = {
        graphic: {
            elements: [
                {
                    type: 'text',
                    left: 'center',
                    top: 'center',
                    style: {
                        text: title,
                        fontSize: 50,
                        fontWeight: 20,
                        lineDash: [0, 200],
                        lineDashOffset: 0,
                        fill: 'transparent',
                        stroke: '#E1F1FF',
                        lineWidth: 1
                    },
                    keyframeAnimation: {
                        duration: 3000,
                        loop: false,
                        keyframes: [
                            {
                                percent: 0.7,
                                style: {
                                    fill: 'transparent',
                                    lineDashOffset: 200,
                                    lineDash: [200, 0]
                                }
                            },
                            {
                                // Stop for a while.
                                percent: 0.8,
                                style: {
                                    fill: 'transparent'
                                }
                            },
                            {
                                percent: 1,
                                style: {
                                    fill: '#E1F1FF'
                                }
                            }
                        ]
                    }
                }
            ]
        }
    };
    option && myChart.setOption(option);
})
</script>

<style></style>
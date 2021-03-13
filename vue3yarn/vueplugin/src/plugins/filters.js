/*
 *
 * 所有过滤器
 *
*/

import Vue from 'vue'
import filters from '@/filter'

// use fiters
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
console.log(filters)
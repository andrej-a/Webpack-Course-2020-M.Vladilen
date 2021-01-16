"use strict";
import './styles/style.css'; //импортируем здесь файл css и плотно работаем с лоадерами(смотри comments и настройки)
import * as $ from 'jquery'; //импортируем jquery
import CreateBox from './class';
import {analyticks} from './analyticks';
import exampleJSON from '@assets/exampleJSON';  //при импорте .json {} не ставятся
import logo from '@assets/logo';  //импортируем .png
const btnCreate = document.querySelector('.buttonCreate');
let count = 0;

$(btnCreate).on('click', function() {
    const create = new CreateBox('.wrapper', '200px', '200px', ' 20px 20px', '#abcd');
    create.create();
    console.log("JSON:", exampleJSON.title);
    analyticks(++count);
});



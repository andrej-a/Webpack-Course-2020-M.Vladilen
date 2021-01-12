"use strict";
import './styles/style.css'; //импортируем здесь файл css и плотно работаем с лоадерами(смотри comments и настройки)
import CreateBox from './class';
import {analyticks} from './analyticks';

const btnCreate = document.querySelector('.buttonCreate');
let count = 0;

btnCreate.addEventListener('click', function() {
    const create = new CreateBox('.wrapper', '200px', '200px', ' 20px 20px', '#abcd');
    create.create();
    
    analyticks(++count);
});



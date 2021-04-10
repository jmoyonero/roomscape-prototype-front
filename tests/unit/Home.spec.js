import {createLocalVue, mount} from '@vue/test-utils'
import Home from "@/views/Home";
import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue();
localVue.use(BootstrapVue);


import axios from 'axios';

jest.mock('axios');
let resp = {
    "data": [
        {
            "id": 1,
            "name": "Resident Evil 2 Remake",
            "console": "PS4",
            "description": "El rey del survival horror regresa con un lavado de cara en este remake del título de culto."
        },
        {
            "id": 2,
            "name": "Spider-Man",
            "console": "PS4",
            "description": "Videojuego de acción y aventura basado en el popular superhéroe hómonimo de la editorial Marvel Comics.?"
        }
    ]
}
//axios.get.mockResolvedValue(resp)
axios.get = jest.fn().mockResolvedValue(resp);

const wrapper = mount(Home, {
    localVue
});

describe('Datos de la vista principal', () => {

    it('validación de la vista principal', async () => {
        let localData = Home.data()

        expect(localData.consoles.length).toEqual(5)
        expect(localData.consoles[0]).toEqual('Nintendo Switch')
        expect(localData.consoles[1]).toEqual('PC')
        expect(localData.consoles[2]).toEqual('PS4')
        expect(localData.consoles[3]).toEqual('PS5')
        expect(localData.consoles[4]).toEqual('XBox')

        expect(localData.videoGames.length).toEqual(0)
    })
})

describe('Elementos HTML de la vista principal', () => {

    it('Validación del título de la página', async () => {
        expect(wrapper.find('.title').text()).toEqual("VIDEOJUEGOS")
    })
    it('Validación del formulario de alta', async () => {
        expect(wrapper.find('#input-group-1').text()).toEqual("Nombre del videojuego:")
        expect(wrapper.find('#select').props().options[0]).toEqual("Nintendo Switch")
        expect(wrapper.find('#select').props().options[1]).toEqual("PC")
        expect(wrapper.find('#select').props().options[2]).toEqual("PS4")
        expect(wrapper.find('#select').props().options[3]).toEqual("PS5")
        expect(wrapper.find('#select').props().options[4]).toEqual("XBox")
        expect(wrapper.find('#input-group-3').text()).toEqual("Descripción:")
    })
    it('Validación de la tabla de videojuegos', async () => {
        const headers = wrapper.find('#table_video_games').find('thead').findAll('th')
        expect(headers.at(0).find('div').text()).toEqual("ID")
        expect(headers.at(1).find('div').text()).toEqual("Nombre")
        expect(headers.at(2).find('div').text()).toEqual("Consola")
        expect(headers.at(3).find('div').text()).toEqual("Descripción")
    })

    it('Validación de la tabla de videojuegos tras la llamada axios', async () => {
        const rows = wrapper.find('#table_video_games').find('tbody').findAll('tr')
        let i = rows.at(0).findAll('td')
        expect(i.at(0).text()).toEqual("2")
        expect(i.at(1).text()).toEqual("Spider-Man")
        expect(i.at(2).text()).toEqual("PS4")
        expect(i.at(3).text()).toEqual("Videojuego de acción y aventura basado en el popular superhéroe hómonimo de la editorial Marvel Comics.?")

        let j = rows.at(1).findAll('td')
        expect(j.at(0).text()).toEqual("1")
        expect(j.at(1).text()).toEqual("Resident Evil 2 Remake")
        expect(j.at(2).text()).toEqual("PS4")
        expect(j.at(3).text()).toEqual("El rey del survival horror regresa con un lavado de cara en este remake del título de culto.")
    })
})


describe('Elementos HTML de la vista principal', () => {

    it('Validación del título de la página', async () => {
        expect(wrapper.find('.title').text()).toEqual("VIDEOJUEGOS")
    })
    it('Validación del formulario de alta', async () => {
        expect(wrapper.find('#input-group-1').text()).toEqual("Nombre del videojuego:")
        expect(wrapper.find('#select').props().options[0]).toEqual("Nintendo Switch")
        expect(wrapper.find('#select').props().options[1]).toEqual("PC")
        expect(wrapper.find('#select').props().options[2]).toEqual("PS4")
        expect(wrapper.find('#select').props().options[3]).toEqual("PS5")
        expect(wrapper.find('#select').props().options[4]).toEqual("XBox")
        expect(wrapper.find('#input-group-3').text()).toEqual("Descripción:")
    })
    it('Validación de la tabla de videojuegos', async () => {
        const headers = wrapper.find('#table_video_games').find('thead').findAll('th')
        expect(headers.at(0).find('div').text()).toEqual("ID")
        expect(headers.at(1).find('div').text()).toEqual("Nombre")
        expect(headers.at(2).find('div').text()).toEqual("Consola")
        expect(headers.at(3).find('div').text()).toEqual("Descripción")
    })
})
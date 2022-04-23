Array.prototype.pick = function() {
    return this[(Math.random() * this.length) | 0]
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

const things = [
    {
        name: 'ravioli',
        gender: 'mp'
    },
    {
        name: 'zuppa',
        gender: 'fs'
    },
    {
        name: 'spaghetti',
        gender: 'mp'
    },
    {
        name: 'gnocchi',
        gender: 'mp'
    },
    {
        name: 'riso',
        gender: 'ms'
    },
    {
        name: 'pollo',
        gender: 'ms'
    },
    {
        name: 'vitello',
        gender: 'ms'
    },
    {
        name: 'maiale',
        gender: 'ms'
    },
    {
        name: 'gamberi',
        gender: 'mp'
    },
    {
        name: 'gamberoni',
        gender: 'mp'
    },
    {
        name: 'pesce',
        gender: 'ms'
    },
    {
        name: 'calamari',
        gender: 'mp'
    },
    {
        name: 'frutti di mare',
        gender: 'mp'
    },
    {
        name: 'anatra',
        gender: 'fs'
    },
    {
        name: 'tofu',
        gender: 'ms'
    },
    {
        name: 'omelette',
        gender: 'fs'
    },
    {
        name: 'cosce di rana',
        gender: 'fp'
    },
    {
        name: 'mulan',
        gender: 'ms'
    },
    {
        name: 'wan-tun',
        gender: 'ms'
    }
]

const adjectives = [
    'fritt@',
    'saltat@',
    'piccant#',
    'alla piastra',
    'in salsa piccante',
    'in salsa agrodolce',
    'in salsa limone',
    'in salsa d\'ostrica',
    'al curry',
    'ai cinque sapori'
]

const get_gendered_adjective = (adjective, thing) => {

    if (adjective.includes('@')) {

        return adjective.replace('@', () => {

            switch (thing.gender) {

                case 'ms':
                    return 'o'
                case 'mp':
                    return 'i'
                case 'fs':
                    return 'a'
                case 'fp':
                    return 'e'
        
            }

        })

    }

    if (adjective.includes('#')) {

        return adjective.replace('#', () => {

            switch (thing.gender) {

                case 'ms':
                case 'fs':
                    return 'e'
                case 'mp':
                case 'fp':
                    return 'i'

            }

        })

    }

    return adjective

}

const generate = () => {

    let thing = things.pick()
    let adjective = get_gendered_adjective(adjectives.pick(), thing)

    return (thing.name + ' ' + adjective).capitalize()

}

const generate_list = (size) => {

    const list = []

    for (let i=0; i<size; i++) {

        let name = generate()

        list.push({
            name: name,
            cost: 1 + Math.round(Math.random()*2*10)/10
        })

    }

    list.sort((a, b) => a.name > b.name)

    return list

}

const data = [
    {
        title: 'ANTIPASTI',
        items: generate_list(5)
    },
    {
        title: 'PRIMI PIATTI',
        items: generate_list(10)
    },
    {
        title: 'SECONDI PIATTI',
        items: generate_list(10)
    }
]

const sections = document.querySelector('.menu-sections')

data.forEach(section => {

    const element = document.createElement('div')
    element.classList.add('menu-section')

    const title = document.createElement('div')
    title.classList.add('section-title')
    title.innerText = section.title

    const items = document.createElement('ol')
    items.classList.add('section-items')

    section.items.forEach(item => {

        const li = document.createElement('li')
        li.innerText = item.name

        const cost = document.createElement('span')
        cost.classList.add('item-cost')
        cost.innerHTML = '€ ' + item.cost.toFixed(2)

        li.append(cost)

        items.append(li)

    })

    element.append(title)
    element.append(items)

    sections.append(element)

})
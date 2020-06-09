
function populatedUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) =>{return res.json()}) // como há apenas um parametro pode ser reescrito assim (res => res.jason() )
    .then(states => {

        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    } )
}

populatedUFs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>" //limpa os options do campo cidades
    citySelect.disabled = true //desabilita o campo cidades enquanto não escolhido o estado

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for ( const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        
        citySelect.disabled = false 
    } )
}

document
.querySelector("select[name=uf]") //pesquisa seletores
.addEventListener("change", getCities)

//Itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for( const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    
    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id

    // verificar se tem itens selecionados, se sim pegá-los
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })

    // se ja estiver selecionado, tirar da seleção
    if(alreadySelected >= 0) {
        //tirar da seleção
        const filteredItems = selectedItems.filter( item=> {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        } )

        selectedItems = filteredItems
    } 
    else {
        // senão estiver selecionado, adicionar a seleção
        selectedItems.push(itemId)        
    }       
    // atualizar o campo escondido com os item selecionado
    collectedItems.value = selectedItems

}
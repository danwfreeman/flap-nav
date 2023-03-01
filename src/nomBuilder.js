
const nom = []

// loop through the nom at given level to find a matching dropdown item, return a pointer to the nom element to add leaf or dropdown to
const nomContains = (model, navName) => {
    for (let i = 0; i < model.length; i++) {
        if (model[i].type === 'dropdown' && model[i].name === navName) {
            return model[i]
        }

        // caller does the traverse down now which is probably better ...
        // else if (model[i].children !== null && Array.isArray(model[i].children)) {
        //   nomContains(model[i].children, navName)
        // }
    }
    return null
}


const buildNomLeaf = (node, spec) => {
    let leaf = { type: 'leaf', name: spec.title, href: spec.href }
    if (node === null) {
        nom.push(leaf)
    } else if (node.children != null) {
        node.children.push(leaf)
    } else {
        node.children = [leaf]
    }
}


const buildNomDropdown = (d, node) => {
    let dropdown = { type: 'dropdown', name: d, children: null }

    if (node !== null) {
        if (node.children != null) {
            node.children.push(dropdown)
        } else {
            node.children = [dropdown]
        }
    } else {
        nom.push(dropdown)
    }

    return dropdown
}


// for each nav level, create a dropdown
// if it already exists, then move to next nav list entry
const buildNomDropdownList = (nav, spec) => {
    let node = null
    let model = nom
    nav.forEach((v, i) => {
        let matchNode = nomContains(model, v)  // does this item exist, if so add under it
        if (matchNode != null) {
            node = matchNode
            model = matchNode.children // recurse down 
            return // forEach continue 
        }
        node = buildNomDropdown(v, node)
    })

    buildNomLeaf(node, spec) // at the end of the navigation tree, always comes the leaf
}


// from json config, build the Navigation Object Model (Nom)
const buildNom = (articles) => {
    articles.forEach((d) => {
        let nav = d.nav;

        // every entry starts with either a leaf or one, or more, dropdowns, then ends with a leaf
        if (nav.length === 0) {
            buildNomLeaf(null, d) // null here specifies root leaf node
        } else {
            buildNomDropdownList(nav, d)
        }
    });
}

const nomBuilder = (articles) => {
    // global vars are kept in scope
    // strict mode will cause this function to be called twice, therefore, appending double leaf nodes
    // if the nom was already walked, just return it
    if (nom.length > 0) {
        return nom;
    }
    buildNom(articles)
    return nom;
}


export default nomBuilder;
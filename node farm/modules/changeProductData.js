function changeProductData(template, product) {
    let output = template.replace(/{product name}/g, product.productName)
    output = output.replace(/{price}/g, product.price)
    output = output.replace(/{qty}/g, product.quantity)
    output = output.replace(/{product place}/g, product.from)
    output = output.replace(/{nutrients}/g, product.nutrients)
    output = output.replace(/{description}/g, product.description)
    output = output.replace(/{Id}/g, product.id)
    output = output.replace(/{image}/g, product.image)

    if (!product.organic)
        output = output.replace(/{not-organic}/g, 'not-organic')
    return output

}


module.exports = changeProductData
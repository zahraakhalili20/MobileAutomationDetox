class CommonAssertions {

expectElementToBeVisible = async(elem,index = 0) => {
    try {
        await expect(elem.atIndex(index)).toBeVisible();
        return true;
    } 
    catch (e) {
        return false;
    }
}

expectElementNotToBeVisible = async(elem,index = 0) => {
    await expect(elem.atIndex(index)).not.toBeVisible();
}

expectElementToHaveText = async(elem,text,index = 0) => {
    await expect(elem.atIndex(index)).toHaveText(text);
}

expectElementToHaveValue = async(elem,value,index = 0) => {
    await expect(elem.atIndex(index)).toHaveValue(value);
}

expectElementToHaveToggleValue = async(elem,value,index = 0) => {
    await expect(elem.atIndex(index)).toHaveToggleValue(value);
}

expectValueToBeGreater = async(initVal, finalVal) => {
    await expect(finalVal).toBeGreaterThan(initVal); 
}

expectElementWithAncestorsToBeVisible = async(elemID,parentID, indexParent = 0) => {
    let result = await elemID.withAncestor(by.id(parentID)).atIndex(indexParent).toBeVisible();
    return result;
  } 

}    
module.exports = CommonAssertions;
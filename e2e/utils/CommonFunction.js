class CommonFunctions {

  tapOnElement = async (elem, index = 0) => {
    await this.waitForElementToVisible(elem, index);
    if (device.getPlatform() === "ios") {
      await elem.atIndex(index).tap()
    }
    else {
      await elem.atIndex(index).longPress(900)
    }
  }
  longPressElement = async (elem, index = 0) => {
    await this.waitForElementToVisible(elem, index);
    await elem.atIndex(index).longPress(500)
  }
  typeTextOnElement = async (elem, text, index = 0) => {
    //  await this.tapOnElement(elem,index);
    await elem.atIndex(index).clearText();
    if (device.getPlatform() === "ios") {
      await elem.atIndex(index).typeText(text + '\n');
      //to close keyboard in android
      // await device.pressBack()
    } else {
      await elem.atIndex(index).replaceText(text);
    }

  }

  multipleTapOnElement = async (elem, count=2, index = 0) => {
    await this.waitForElementToVisible(elem, index);
    await elem.atIndex(index).multiTap(count);
  }

  clearTextOnElement = async (elem, index = 0) => {
    await this.waitForElementToVisible(elem, index);
    await elem.atIndex(index).clearText();
  }

  waitForElementToVisible = async (elem, index = 0) => {
    await waitFor(elem.atIndex(index)).toBeVisible().withTimeout(4000);
  }

  waitForElementToNotVisible = async (elem, index = 0) => {
    await waitFor(elem.atIndex(index)).not.toBeVisible().withTimeout(4000);
  }

  waitForElementToExist = async (elem, index = 0) => {
    await waitFor(elem.atIndex(index)).toExist().withTimeout(10000);
  }

  waitForElementToNotExist = async (elem, index = 0) => {
    await waitFor(elem.atIndex(index)).not.toExist().withTimeout(4000);
  }

  swipeElement = async (elem, dir, speed = 'slow', index = 0) => {
    await this.waitForElementToVisible(elem, index);
    await elem.atIndex(index).swipe(dir, speed);
  }

  scrollElement = async (elem, pixels, dir, index = 0, x = NaN, y = NaN) => {
    await this.waitForElementToVisible(elem, index);
    await elem.atIndex(index).scroll(pixels, dir, x, y)
  }

  waitForElementToVisibleWhileScrolling = async (elemToFind, elemToScroll, dir = 'up', index = 0, maxRetries = 10) => {
    let visible = await this.isElementVisible(elemToFind, index)
    let retries = 0
    while (!visible && retries < maxRetries) {
      await elemToScroll.swipe(dir, 'fast', 0.3)
      visible = await this.isElementVisible(elemToFind, index)
      retries = retries + 1
    }
    if (!visible)
      throw "element not found after swiping ", elemToFind
  }
  waitForElementToVisibleWhileScrollingSlow = async (elemToFind, elemToScroll, dir = 'up', index = 0, maxRetries = 10) => {
    let visible = await this.isElementVisible(elemToFind, index)
    let retries = 0
    while (!visible && retries < maxRetries) {
      await elemToScroll.swipe(dir, 'slow', 0.3)
      visible = await this.isElementVisible(elemToFind, index)
      retries = retries + 1
    }
    if (!visible)
      throw "element not found after swiping ", elemToFind
  }
  //edge should be one of [left, right, top, bottom], but got down
  scrollToEdge = async (elem, dir, index = 0) => {
    await this.waitForElementToVisible(elem, index);
    await elem.atIndex(index).scrollTo(dir);
  }

  getCountOfElements = async (elem) => {
    let attributes
    try {
       attributes = await elem.getAttributes();
    }
    catch (error) { return 0 }
    // If the query matches multiple elements, the attributes of all matched elements is returned as an array of objects under the elements key.
    if ("elements" in attributes) {
      return attributes.elements.length;
    }
    else {
      return 1;
    }
  }

  getAttributesOfElement = async (element, index = 0) => {
    this.waitForElementToExist(element)
    let attribute = await element.atIndex(index).getAttributes();
    //console.log(attribute)
    return attribute;
  }

  accessElementByIdWithAncestors = async (elemID, parentID, indexParent = 0) => {
    let elementWithAncestor = await element(by.id(elemID).withAncestor(by.id(parentID))).atIndex(indexParent);
    return elementWithAncestor;
  }
  accessElementByTypeWithAncestors = async (elemType, parentID, indexParent = 0) => {
    let elementWithAncestor = await element(by.type(elemType).withAncestor(by.id(parentID))).atIndex(indexParent);
    return elementWithAncestor;
  }

  getElementLabel = async (element, index = 0) => {
    await this.waitForElementToExist(element, index);
    const attributes = await element.atIndex(index).getAttributes();
    console.log(attributes)
    if (attributes.elements && attributes.elements.length > 0) {
      // If getAttributes has elements, return trimmed and cleaned label at the specified index
      const cleanedLabel = attributes.elements[index].label.replace(/\s+/g, ' ').trim();
      return cleanedLabel;
    } else {
      // If getAttributes does not have elements, return label at the specified index without trimming or cleaning
      return attributes.label.replace(/\s+/g, ' ').trim();
    }
  }
  getRawElementLabel = async (element, index = 0) => {
    await this.waitForElementToExist(element, index);
    const attributes = await element.atIndex(index).getAttributes();
    //console.log(attributes)
    if (attributes.elements && attributes.elements.length > 0) {
      // If getAttributes has elements, return trimmed and cleaned label at the specified index
      return attributes.elements[index].label;
    } else {
      // If getAttributes does not have elements, return label at the specified index without trimming or cleaning
      return attributes.label
    }
  }

  getAllElementLabels = async (elements) => {
    const labels = [];

    for (let index = 0; index < elements.length; index++) {
      const element = elements[index];
      //await this.waitForElementToVisible(element, index);
      const attributes = await element.getAttributes();
      console.log(attributes);
      if (attributes.elements && attributes.elements.length > 0) {
        // If getAttributes has elements, push trimmed and cleaned label at the specified index
        const cleanedLabel = attributes.elements[index].label.replace(/\s+/g, ' ').trim();
        labels.push(cleanedLabel);
      } else {
        // If getAttributes does not have elements, push label at the specified index without trimming or cleaning
        labels.push(attributes.label.replace(/\s+/g, ' ').trim());
      }
    }

    return labels;
  }

  getElementPlaceHolder = async (element, index = 0) => {
    await this.waitForElementToExist(element, index);
    const attributes = await element.atIndex(index).getAttributes();
    if (attributes.elements && attributes.elements.length > 0) {
      // If getAttributes has elements, return trimmed and cleaned label at the specified index
      const cleanedLabel = attributes.elements[index].placeholder.replace(/\s+/g, ' ').trim();
      return cleanedLabel;
    } else {
      // If getAttributes does not have elements, return label at the specified index without trimming or cleaning
      return attributes.placeholder.replace(/\s+/g, ' ').trim();
    }
  }
  getElementText = async (element, index = 0) => {
    const attributes = await element.atIndex(index).getAttributes();
    if (attributes.elements && attributes.elements.length > 0) {
      // If getAttributes has elements, return trimmed text at the specified index
      return attributes.elements[index].text.trim();
    } else {
      // If getAttributes does not have elements, return text at the specified index without trimming
      return attributes.text.trim();

    }
  }
  async getIndicesOfVisibleElements(element) {
    const attributes = await element.getAttributes();
    console.log(attributes)
    if (attributes.elements && attributes.elements.length > 0) {
      // If getAttributes has elements, return indices where 'visible' is true
      return attributes.elements.map((el, index) => (el.visible === true ? index : -1))
        .filter(index => index !== -1);
    } else {
      // If getAttributes does not have elements, return the index of the element
      return [attributes.index];
    }
  }
  async getIndexOfElementWithText(element, value) {
    const attributes = await element.getAttributes();
    if (attributes.elements && attributes.elements.length > 0) {
      attributes.elements.sort((a, b) => {
        // Sort by Y-coordinate (top to bottom)
        if (a.frame.y === b.frame.y) {
          // If Y-coordinates are the same, sort by X-coordinate (right to left)
          return b.frame.x - a.frame.x;
        }
        return a.frame.y - b.frame.y;
      });

      // If getAttributes has elements, return indices where 'visible' is true
      return attributes.elements.map((el, index) => (el.label === value ? index : -1))
        .filter(index => index !== -1);
    } else {
      // If getAttributes does not have elements, return the index of the element
      return [attributes.index];
    }
  }
  getElementLabelSorted = async (element, index = 0) => {
    const attributes = await element.getAttributes();
    //console.log(attributes)
    if (attributes.elements && attributes.elements.length > 0) {
      attributes.elements.sort((a, b) => {
        // Sort by Y-coordinate (top to bottom)
        if (a.frame.y === b.frame.y) {
          // If Y-coordinates are the same, sort by X-coordinate (right to left)
          return b.frame.x - a.frame.x;
        }
        return a.frame.y - b.frame.y;
      });

      // If getAttributes has elements, return trimmed and cleaned label at the specified index
      const cleanedLabel = attributes.elements[index].label.replace(/\s+/g, ' ').trim();
      return cleanedLabel;
    } else {
      // If getAttributes does not have elements, return label at the specified index without trimming or cleaning
      return attributes.label.replace(/\s+/g, ' ').trim();
    }
  }
  getElementsSorted = async (element) => {
    const attributes = await element.getAttributes();
    //console.log(attributes);
    if (attributes.elements && attributes.elements.length > 0) {
      // Filter out invisible elements and get their indices
      const visibleIndices = attributes.elements
        .map((el, index) => (el.visible === true ? index : -1))
        .filter(index => index !== -1);

      // Sort visible elements from right to left (based on X-coordinate)
      const sortedVisibleElements = attributes.elements
        .filter((el, index) => visibleIndices.includes(index))
        .sort((a, b) => b.frame.x - a.frame.x);

      console.log(sortedVisibleElements);

      return sortedVisibleElements.map(el => attributes.elements.indexOf(el));
    } else {
      // If getAttributes does not have elements
      return [attributes];
    }
  };

  async getIndicesOfVisibleTextElements(element, text) {
    const elements = (await element.getAttributes()).elements
    return elements.map((element, index) => {
      const condition = element.visible === true && (element.label).trim() == text;
      return condition ? index : -1;
    }).filter(index => index !== -1);
  }
  getElementEnabledAttribute = async (element, index = 0) => {
    const attributes = await element.atIndex(index).getAttributes();
    //console.log(attributes)
    if (attributes.elements && attributes.elements.length > 0) {
      return attributes.elements[index].enabled;
    } else {
      return attributes.enabled
    }
  }
  tapOnDefaultDatePickerDone = async (platform) => {
    let elem;
    if (platform == "ios") {
      elem = element(by.text('Done'))
    }
    else {
      elem = element(by.text('DONE'))
    }

    await this.tapOnElement(elem)
  }

  tapOnDefaultDatePickerCancel = async (platform) => {
    let elem;
    if (platform == "ios") {
      elem = element(by.text('Cancel'))
    }
    else {
      elem = elem(by.text('CANCEL'))
    }

    await this.tapOnElement(elem)
  }
  isElementVisible = async (element, index = 0) => {
    try {
      await this.waitForElementToVisible(element, index);
      return true;
    } catch (error) {
      return false;
    }
  }
  isElementExist = async (element, index = 0) => {
    try {
      await this.waitForElementToExist(element, index);
      return true;
    } catch (error) {
      return false;
    }
  }
  async pause(n) {
    await new Promise(resolve => setTimeout(resolve, n * 1000));
    console.log(`Paused for ${n} seconds.`);
  }
}
module.exports = new CommonFunctions();

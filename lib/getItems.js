/* Thanks to https://github.com/christophebe/find-main-content */
const defaultOptions = {
  removeTags: 'script,link,header,style,noscript,object,footer,nav,iframe,br,svg',
  // Remove the Headers from the main content, the Headers will be in the final json structure
  removeHeadersFromContent: 'h1, h2, h3, h4, h5, h6, h7',
  // if true, don't add the images in the final extraction
  removeImages: true,
  // Replace links by their anchor text
  replaceLinks: true,
  // Remove HTML Form
  removeForm: false,
  // Remove basic html tags that have no children
  removeEmptyTag: false
};

const IGNORE_TAGS = 'script,link,header,style,noscript,object,footer,nav,iframe,br,svg'
const SEPARATE_HEADERS = 'h1, h2, h3, h4, h5, h6, h7';

  function findContent($) {
    const result = {
      title: getTitle($),
      desc: getDescription($),
      h1: getH1($),
      h2: getH2($),
      h3: getH3($),
      h4: getH4($),
      h5: getH5($),
      h6: getH6($),
      h7: getH7($),
      content: getContent($),
      images: findImages($),
      tag: getTags($),
      category: getCategories($),
      keyword: getKeywords($),
      url: getUrl($),
      date: getDate($),
    };
    return result;
  }

  function getTitle($) {
    return $('title') ? removeLineBreaks && removeDoubleSpaces($('title').text()) : '';
  }
  function getDescription($) {
    return $('meta[name=description]').attr('content') ? removeLineBreaks($('meta[name=description]').attr('content')) : '';
  }
  function getUrl($) {
    return $('.u-url').attr('href');
  }
  function getDate($) {
    return $('time').text() ? removeLineBreaks && removeDoubleSpaces($('time').text()) : '';
  }
  function getH1($) {
    return $('body').find('h1').length ? removeLineBreaks && removeDoubleSpaces($('h1').first().text()) : '';
  }
  function getH2($) {
    return $('body').find('h2').length ? removeLineBreaks && removeDoubleSpaces($('h2').first().text()) : '';
  }
  function getH3($) {
    return $('body').find('h3').length ? removeLineBreaks && removeDoubleSpaces($('h3').first().text()) : '';
  }
  function getH4($) {
    return $('body').find('h4').length ? removeLineBreaks && removeDoubleSpaces($('h4').first().text()) : '';
  }
  function getH5($) {
    return $('body').find('h5').length ? removeLineBreaks && removeDoubleSpaces($('h5').first().text()) : '';
  }
  function getH6($) {
    return $('body').find('h6').length ? removeLineBreaks && removeDoubleSpaces($('h6').first().text()) : '';
  }
  function getH7($) {
    return $('body').find('h7').length ? removeLineBreaks && removeDoubleSpaces($('h7').first().text()) : '';
  }
  function getTags($) {
    return $('body').find('tags').length ? removeLineBreaks && removeDoubleSpaces($('tags').first().text()) : '';
  }
  function getCategories($) {
    return $('body').find('categories').length ? removeLineBreaks && removeDoubleSpaces($('categories').first().text()) : '';
  }
  function getKeywords($) {
    return $('body').find('keywords').length ? removeLineBreaks && removeDoubleSpaces($('keywords').first().text()) : '';
  }

  function findImages($) {
    const images = [];
  
    $('body').find('img').each((i, img) => {
      images.push({ src: $(img).attr('src'), alt: $(img).attr('alt') });
    });
  
    return images;
  }
function getContentStrip($) {
    cleanUpHtml($);
    return $('body').html() ? stripHtml($('body').text()) : '';
  }
function getContent($) {
    return getContentStrip($) ? removeLineBreaks && removeDoubleSpaces(getContentStrip($)) : '';
}
  function removeDoubleSpaces(s) {
    if (!s) {
      return '';
    }
    return s.replace(/\s+/g, '');
  }
  function removeLineBreaks(s) {
    if (!s) {
      return '';
    }
    return s.replace(/(\r\n|\n|\r)/gm, '');
  }
  function stripHtml(s) {
    if (!s) {
      return '';
    }
    return s.replace(/(<([^>]+)>)/ig, '');
  }
  function cleanUpHtml($) {
    $('body').find(IGNORE_TAGS).remove();
    $('body').find(SEPARATE_HEADERS).remove();
}

exports.findContent = findContent;
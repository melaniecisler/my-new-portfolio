var imgTags = document.querySelectorAll('img');

for (var index = 0; index < imgTags.length; index++) {
    var imgPath = `./images/image_${index + 1}.jpg`;
    var altTag = `Image ${index + 1}`;
    imgTags[index].setAttribute('src', imgPath);
    imgTags[index].setAttribute('alt', altTag)
}


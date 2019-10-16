fetch('https://api.github.com/search/repositories?q=language:javascript+created:2017-01-01..2018-01-01&sort=stars&order=desc')
  .then(response => response.json())
  .then(data => {
    let target = document.querySelector('#insert-here')
    target.innerHTML = ''
    for (let i = 0; i < 3; i++) {
      target.innerHTML += 
        `<p><img src="${data.items[i].owner.avatar_url}" style="display:inline-block;width:64px;height:64px;">
        <a href=${data.items[i].svn_url} style="display:inline">
        ${data.items[i].name}</a>: <span style="font-weight:600;">${data.items[i].stargazers_count}</span> stars
        </p>`
    }
  })

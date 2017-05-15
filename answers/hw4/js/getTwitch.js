function getData(cb) {
    const clientId = 's44s145uexjgeu9mqqa1s93oc1bnli';
    const limit = 20;

    $.ajax({
        url: 'https://api.twitch.tv/kraken/streams/?client_id=' + clientId + '&game=League%20of%20Legends&limit=' + limit,
        success: (response) => {
            console.log(response);
            cb(null, response);
        },
        error: (err) => {
            cb(err)
        }
    })
}

getData((err, data) => {
    if (err) {
        console.log(err);
    } else {
        const streams = data.streams;

        const $row = $('.row');
        for (const stream of streams) {
            $row.append(getColumn(stream));
        }
    }
});

function getColumn(data) {
    return `
    <div class="col">
      <div class="preview">
        <img src="${data.preview.medium}"/>
      </div>
      <div class="bottom">
        <div class="intro">
          <div class="logo">
              <img src="${data.channel.logo}" />
          </div>
          <div class="desc">
            <div class="title">
              ${data.channel.status}
            </div>
            <div class="name">
              ${data.channel.display_name}
            </div>
          </div>
        </div>
      </div>
    </div>`;
}
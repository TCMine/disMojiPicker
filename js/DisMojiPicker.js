// this code is pretty hacky because i've never done anything like this before. bare with me. [if it works, it works :shrug:]

(function ($) {
    let f
    const selectables = function(obj) {
        $(obj).append(`<div class="emoji-picker">
                        <div class="emoji-selectables">
                            <span class="picker-emoji-sel emoji-smileys active" data-emoji="smileys">😀</span>
                            <!--<span class="picker-emoji-sel emoji-gestures" data-emoji="gestures">👌</span>-->
                            <span class="picker-emoji-sel emoji-peoples" data-emoji="peoples">🧓</span>
                            <span class="picker-emoji-sel emoji-symbos" data-emoji="symbos">❤️</span>
                            <span class="picker-emoji-sel emoji-nature" data-emoji="nature">🍀</span>
                            <span class="picker-emoji-sel emoji-food" data-emoji="food">🍌</span>
                            <span class="picker-emoji-sel emoji-activity" data-emoji="activity">🏀</span>
                            <span class="picker-emoji-sel emoji-travel" data-emoji="travel">✈️</span>
                            <span class="picker-emoji-sel emoji-objects" data-emoji="objects">💡</span>

                            </div>
                        <div class="emoji-content">
                            <div id="emoji-smileys" class="picker-emoji active picker-emoji-content emoji-smileys"></div>
                            <div id="emoji-gestures" class="picker-emoji picker-emoji-content emoji-gestures"></div>
                            <div id="emoji-peoples" class="picker-emoji picker-emoji-content emoji-peoples"></div>
                            <div id="emoji-symbos" class="picker-emoji picker-emoji-content emoji-symbos"></div>
                            <div id="emoji-natures" class="picker-emoji picker-emoji-content emoji-nature"></div>
                            <div id="emoji-foods" class="picker-emoji picker-emoji-content emoji-food"></div>
                            <div id="emoji-activity" class="picker-emoji picker-emoji-content emoji-activity"></div>
                            <div id="emoji-travel" class="picker-emoji picker-emoji-content emoji-travel"></div>
                            <div id="emoji-objects" class="picker-emoji picker-emoji-content emoji-objects"></div>

                        </div>
                        <div>`);
        return this;
    }

    $.fn.disMojiPicker = async function () {

        selectables(this);

        const url = "https://raw.githubusercontent.com/github/gemoji/master/db/emoji.json"

         f = fetch(url)
            .then(response => response.json())
            .then(data => {
                let emojis = data
                emojis.forEach(e => {
                    let category = e.category.toLowerCase()
                    let finalcat = "objects"

                    if (e.description == "eye in speech bubble") e.emoji = "👁‍🗨"

                    if (category.includes("people & body")) finalcat = "peoples"
                    if (category.includes("smileys & emotion")) finalcat = "smileys"
                    if (category.includes("symbols")) finalcat = "symbos"
                    if (category.includes("animals & nature")) finalcat = "natures"
                    if (category.includes("food & drink")) finalcat = "foods"
                    if (category.includes("activities")) finalcat = "activity"
                    if (category.includes("travel & places")) finalcat = "travel"
                    if (!category.includes("objects") && finalcat == "objects") return

                    $(`#emoji-${finalcat}`).append(`<span>${e.emoji}</span>`)
                })

                twemoji.parse(document.body)
            })

        $('.emoji-selectables span').click(function() {
            $(`.picker-emoji-sel`).removeClass('active')
            $(`.picker-emoji`).removeClass('active');
            $(`.emoji-${$(this)[0].dataset.emoji}`).addClass('active');
            $(`.picker-emoji-sel.emoji-${$(this)[0].dataset.emoji}`).addClass('active');
        });

        return this;
    }

   $.fn.picker = async function(emoji) {
       await f;
       $('.picker-emoji-content span').click(function(e) {
           emoji($($(this).children()).attr('alt'));
       })
   }


})(jQuery);

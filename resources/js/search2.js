let pageId = 1, j = 0;
$('.selections').on('change','#selector', function(){
    if ($('.container').children().length > 1) {
        while ($('.container').children().length > 1) {
            $('.container').children().last().remove();
        }
    }
    if ($('.selections').children().length > 2) {
        while ($('.selections').children().length > 2) {
            $('.selections').children().last().remove();
        }
    }

    $.get("http://local.dekanat.bsu.edu.ru/blocks/bsu_api/students.php/search?q=" +
        $('.selections').children('#selector').val()+"&page[number]="+pageId+"&page[size]=10", function (data) {
        if(pageId === 1){
            j = 0;
        }

        $('.selections').append(
            "<p>Выберите страницу:</p>" +
            "<div class='page'>" +
            "<input type='button' id='left' value='←'>" +
            "<input type='button' id='right' value='→'>" +
            "</div>");
        if(data.length !== 0) {
            let tempText = "<h1>Студенты</h1><table id='students'>" +
                "<tr><th>№<br>п/п</th><th>Логин</th><th>ФИО</th><th>Номер группы</th><th>Год поступления</th><th>Номер зачётной книжки</th></tr>";
            data.forEach((student) => {
                j++;
                tempText += "<tr>" +
                    "<td>" + parseInt(j) + "</td>" +
                    "<td>" + student['username'] + "</td>" +
                    "<td>" + student['name'] + "</td>" +
                    "<td>" + student['groupname'] + "</td>" +
                    "<td>" + student['startyear'] + "</td>" +
                    "<td>" + student['marksheetid'] + "</td></tr>";
            });
            tempText += "</table>";
            $(".container").append(tempText);
        }
    })
        .fail(function(){
            $('.container').append('<h1>Студент не найден!</h1>');
        });
});
$('.selections').on('click','#right', function() {
    pageId++;
    if ($('.container').children().length > 1) {
        while ($('.container').children().length > 1) {
            $('.container').children().last().remove();
        }
    }
    if ($('.selections').children().length > 2) {
        while ($('.selections').children().length > 2) {
            $('.selections').children().last().remove();
        }
    }

    $.get("http://local.dekanat.bsu.edu.ru/blocks/bsu_api/students.php/search?q=" +
        $('.selections').children('#selector').val()+"&page[number]="+pageId+"&page[size]=10", function (data) {
        if(pageId === 1){
            j = 0;
        }

        $('.selections').append(
            "<p>Выберите страницу:</p>" +
            "<div class='page'>" +
            "<input type='button' id='left' value='←'>" +
            "<input type='button' id='right' value='→'>" +
            "</div>");
        if(data.length !== 0) {
            console.log(data.length);
            let tempText = "<h1>Студенты</h1><table id='students'>" +
                "<tr><th>№<br>п/п</th><th>Логин</th><th>ФИО</th><th>Номер группы</th><th>Год поступления</th><th>Номер зачётной книжки</th></tr>";
            data.forEach((student) => {
                j++;
                tempText += "<tr>" +
                    "<td>" + parseInt(j) + "</td>" +
                    "<td>" + student['username'] + "</td>" +
                    "<td>" + student['name'] + "</td>" +
                    "<td>" + student['groupname'] + "</td>" +
                    "<td>" + student['startyear'] + "</td>" +
                    "<td>" + student['marksheetid'] + "</td></tr>";
            });
            tempText += "</table>";
            $(".container").append(tempText);
        }
    })
        .fail(function(){
            $('.container').append('<h1>Студент не найден!</h1>');
        });

});
$('.selections').on('click','#left', function() {
    if (j - 20 < 0) {
        return;
    }
    j -= 20;
    pageId--;
    if ($('.container').children().length > 1) {
        while ($('.container').children().length > 1) {
            $('.container').children().last().remove();
        }
    }
    if ($('.selections').children().length > 2) {
        while ($('.selections').children().length > 2) {
            $('.selections').children().last().remove();
        }
    }

    $.get("http://local.dekanat.bsu.edu.ru/blocks/bsu_api/students.php/search?q=" +
        $('.selections').children('#selector').val()+"&page[number]="+pageId+"&page[size]=10", function (data) {
        if(pageId === 1){
            j = 0;
        }

        $('.selections').append(
            "<p>Выберите страницу:</p>" +
            "<div class='page'>" +
            "<input type='button' id='left' value='←'>" +
            "<input type='button' id='right' value='→'>" +
            "</div>");
        if(data.length !== 0) {
            let tempText = "<h1>Студенты</h1><table id='students'>" +
                "<tr><th>№<br>п/п</th><th>Логин</th><th>ФИО</th><th>Номер группы</th><th>Год поступления</th><th>Номер зачётной книжки</th></tr>";
            data.forEach((student) => {
                j++;
                tempText += "<tr>" +
                    "<td>" + parseInt(j) + "</td>" +
                    "<td>" + student['username'] + "</td>" +
                    "<td>" + student['name'] + "</td>" +
                    "<td>" + student['groupname'] + "</td>" +
                    "<td>" + student['startyear'] + "</td>" +
                    "<td>" + student['marksheetid'] + "</td></tr>";
            });
            tempText += "</table>";
            $(".container").append(tempText);
        }
    })
        .fail(function(){
            $('.container').append('<h1>Студент не найден!</h1>');
        });

});

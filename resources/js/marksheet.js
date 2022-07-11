let groupname = marksheetname = term = '';

$('#groupname').change(function(){
    if($('.selections').children().length > 2){
        while ($('.selections').children().length > 2){
            $('.selections').children().last().remove();
        }
    }
    if($(this).val().length > 8){
        $('.selections').append("<p>Неверный номер группы!</p>");
    }else {
        groupname = $(this).val();
        $('.selections').append("<p>Введите номер записной книжки:</p><input type='text' id='marksheetname'>");
    }
});
$('.selections').on('change','#marksheetname', function(){
    if($('.selections').children().length > 4){
        while ($('.selections').children().length > 4){
            $('.selections').children().last().remove();
        }
    }
    if($('.selections').children('#marksheetname').val().length > 8){
        $('.selections').append("<p>Неверный номер записной книжки!</p>");
    }else {
        marksheetname = $('.selections').children('#marksheetname').val();
        $('.selections').append("<p>Выберите семестр:</p>" +
            "<select id='term'>" +
            "<option selected value=''>Выберите...</option>" +
            "<option value=''>Все семестры</option>" +
            "<option value='1'>1</option>" +
            "<option value='2'>2</option>" +
            "<option value='3'>3</option>" +
            "<option value='4'>4</option>" +
            "<option value='5'>5</option>" +
            "<option value='6'>6</option>" +
            "<option value='7'>7</option>" +
            "<option value='8'>8</option>" +
            "<option value='9'>9</option>" +
            "<option value='10'>10</option>" +
            "</select>");
    }
});
function switchMark(mark){
    switch (mark){
        case 1:
            return "Зачтено";
        case 2:
            return "Неудовлетворительно";
        case 3:
            return "Удовлетворительно";
        case 4:
            return "Хорошо";
        case 5:
            return "Отлично";
        case 6:
            return "Не зачтено";
        case 7:
            return "Не явился(ась)";
        case 8:
            return "Не допущен";
    }
}
$('.selections').on('change','#term', function(){
    $('h1, h2, table, tbody, tr, th, td, br').remove();
    try {
        term = $('.selections').children('#term').val();
        $.get("http://local.dekanat.bsu.edu.ru/blocks/bsu_api/marksheets.php/" + groupname + "/" + marksheetname + "?term=" + term, function (data) {
            let marksheet = data;
            let tempText = "<h1>Зачётная книжка</h1><br><h2>Теоретический курс</h2>" +
                "<table id='exams'>" +
                "<tr><th>№<br>п/п</th><th>Дисциплина</th><th>Семестр</th><th>Объём часов</th><th>Преподаватель</th><th>Экзаменац. отметки</th><th>Дата сдачи</th></tr>";
            for (let i = 0; i < marksheet['exams'].length; i++) {
                tempText += "<tr>" +
                    "<td>" + parseInt(i + 1) + "</td>" +
                    "<td>" + marksheet['exams'][i]['name'] + "</td>" +
                    "<td>" + marksheet['exams'][i]['term'] + "</td>" +
                    "<td>" + marksheet['exams'][i]['hours'] + "</td><td>";
                marksheet['exams'][i]['teachers'].forEach(teacher => tempText += teacher['name'] + ',<br>');
                tempText = tempText.slice(0, -5);
                let mark = marksheet['exams'][i]['marks'];
                if (mark == null) {
                    tempText += '</td><td></td><td></td></tr>';
                } else {
                    tempText += '</td><td>' + switchMark(mark[0]['mark']) + '</td><td>';
                    tempText += new Date(mark[0]['date'] * 1000).toLocaleDateString("ru-RU") + '</td></tr>';
                }
            }
            tempText += "</table><br><br><h2>Практический курс</h2>";
            $(".container").append(tempText);
            tempText =
                "<table id='credits'>" +
                "<tr><th>№ п/п</th><th>Дисциплина</th><th>Семестр</th><th>Объём часов</th><th>Преподаватель</th><th>Экзаменац. отметки</th><th>Дата сдачи</th></tr>";
            for (let i = 0; i < marksheet['credits'].length; i++) {
                tempText += "<tr>" +
                    "<td>" + parseInt(i + 1) + "</td>" +
                    "<td>" + marksheet['credits'][i]['name'] + "</td>" +
                    "<td>" + marksheet['credits'][i]['term'] + "</td>" +
                    "<td>" + marksheet['credits'][i]['hours'] + "</td><td>";
                marksheet['credits'][i]['teachers'].forEach(teacher => tempText += teacher['name'] + ',<br>');
                tempText = tempText.slice(0, -5);
                let mark = marksheet['credits'][i]['marks'];
                if (mark == null) {
                    tempText += '</td><td></td><td></td></tr>';
                } else {
                    tempText += '</td><td>' + switchMark(mark[0]['mark']) + '</td><td>';
                    tempText += new Date(mark[0]['date'] * 1000).toLocaleDateString("ru-RU") + '</td></tr>';
                }
            }
            tempText += '</table>';
            $(".container").append(tempText);
            if (marksheet['practice'].length !== 0) {
                tempText = "<br><br><h2>Практика</h2><table id='practice'>" +
                    "<tr><th>№ п/п</th><th>Дисциплина</th><th>Семестр</th><th>Количество недель</th><th>Преподаватель</th><th>Экзаменац. отметки</th><th>Дата сдачи</th></tr>";
                for (let i = 0; i < marksheet['practice'].length; i++) {
                    tempText += "<tr>" +
                        "<td>" + parseInt(i + 1) + "</td>" +
                        "<td>" + marksheet['practice'][i]['name'] + "</td>" +
                        "<td>" + marksheet['practice'][i]['term'] + "</td>" +
                        "<td>" + marksheet['practice'][i]['week'] + "</td><td>";
                    marksheet['practice'][i]['teachers'].forEach(teacher => tempText += teacher['name'] + ',<br>');
                    tempText = tempText.slice(0, -5);
                    let mark = marksheet['practice'][i]['marks'];
                    if (mark == null) {
                        tempText += '</td><td></td><td></td></tr>';
                    } else {
                        tempText += '</td><td>' + switchMark(mark[0]['mark']) + '</td><td>';
                        tempText += new Date(mark[0]['date'] * 1000).toLocaleDateString("ru-RU") + '</td></tr>';
                    }
                }
                tempText += '</table>';
                $(".container").append(tempText);
            }
            if (marksheet['courseworks'].length !== 0) {
                tempText = "<br><br><h2>Курсовые работы (проекты)</h2><table id='courseworks'>" +
                    '<tr><th>№ п/п</th><th>Дисциплина</th><th>Семестр</th><th>Преподаватель</th><th>Экзаменац. отметки</th><th>Дата сдачи</th></tr>';
                for (let i = 0; i < marksheet['courseworks'].length; i++) {
                    tempText += '<tr><td>' + parseInt(i + 1) +
                        '</td><td>' + marksheet['courseworks'][i]['name'] +
                        '</td><td>' + marksheet['courseworks'][i]['term'] + "</td><td>";
                    marksheet['courseworks'][i]['teachers'].forEach(teacher => tempText += teacher['name'] + ',<br>');
                    tempText = tempText.slice(0, -5);
                    let mark = marksheet['courseworks'][i]['marks'];
                    if (mark == null) {
                        tempText += '</td><td></td><td></td></tr>';
                    } else {
                        tempText += '</td><td>' + switchMark(mark[0]['mark']) + '</td><td>';
                        tempText += new Date(mark[0]['date'] * 1000).toLocaleDateString("ru-RU") + '</td></tr>';
                    }
                }
                tempText += '</table>';
                $(".container").append(tempText);
            }
        })
            .fail(function(){
                $(".selections").append('<h1>Зачётной книжки не найдено!</h1>');
            });
    }
    catch (e) {
        $(".selections").append('<h1>Зачётной книжки не найдено!</h1>');
        console.error(e.message);
    }
});

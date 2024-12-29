function modifyInput() {
    // الحصول على قيم المدخلات
    let inputEteisyys_m = document.getElementById('eteisyys').value;
    let inputAika_s = document.getElementById('aika').value;

    // استبدال الفاصلة بالنقطة
    inputEteisyys_m = inputEteisyys_m.replace(',', '.');
    inputAika_s = inputAika_s.replace(',', '.');

    // تحويل القيم إلى أرقام
    const distanceInMeters = parseFloat(inputEteisyys_m);
    const timeInSeconds = parseFloat(inputAika_s);

    // التحقق من أن القيم أرقام صالحة
    if (isNaN(distanceInMeters) || isNaN(timeInSeconds) || timeInSeconds === 0) {
        document.getElementById('nopeus').innerHTML = "الرجاء إدخال قيم صحيحة.";
        return;
    }

    // تحويل القيم إلى الوحدات الصحيحة
    const km = distanceInMeters / 1000;
    const h = timeInSeconds / 3600;

    // حساب السرعة
    const speed = km / h;

    // عرض النتيجة
    document.getElementById('nopeus').innerHTML = "Nopeus on = " + speed.toFixed(2) + 'Km';
}

var property = new Array();
var unit = new Array();
var factor = new Array();

property[0] = "Length";
unit[0] = new Array("Meter (m)", "Angstrom (A')", "Centimeter (cm)", "Kilometer (km)", "Foot (ft)", "Inch (in)", "Light year (LY)", "Micrometer (mu-m)", "Millimeter (mm)", "Nanometer (nm)", "Mile (int'l nautical)", "Mile (US statute)", "Picometer (pm)", "Yard (yd)");
factor[0] = new Array(1, 1E-10, .01, 1000, .3048, .0254, 9.46055E+15, .000001, .001, 1E-9, 1852, 1609.344, 1E-12, .9144);

property[1] = "Mass";
unit[1] = new Array("Kilogram (kgr)", "Gram (gr)", "Milligram (mgr)", "Microgram (mu-gr)", "Carat (metric)(ct)", "Pound mass (lbm)", "Tonne");
factor[1] = new Array(1, .001, 1e-6, .000000001, .0002, .4535924, 1000);

property[2] = "Area";
unit[2] = new Array("Square meter (m^2)", "Acre (acre)", "Hectare", "Square centimeter", "Square kilometer", "Square foot (ft^2)", "Square inch (in^2)", "Square mile (mi^2)", "Square yard (yd^2)");
factor[2] = new Array(1, 4046.856, 10000, .0001, 1000000, 9.290304E-02, 6.4516E-04, 2589988, .8361274);

property[3] = "Volume";
unit[3] = new Array("Cubic Meter (m^3)", "Cubic centimeter", "Cubic millimeter", "Acre-foot", "Barrel (oil)", "Cup", "Cubic foot", "Gallon (UK)", "Gallon (US,dry)", "Gallon (US,liq)", "Cubic inch (in^3)", "Liter", "Ounce (UK,fluid)", "Ounce (US,fluid)", "Tablespoon", "Teaspoon", "Cubic yard");
factor[3] = new Array(1, .000001, .000000001, 1233.482, .1589873, .0002365882, .02831685, .004546087, .004404884, .003785412, .00001638706, .001, .00002841305, .00002957353, .00001478676, .000004928922, .7645549);

property[4] = "Temperature";
unit[4] = new Array("Degrees Celsius ('C)", "Degrees Fahrenheit ('F)", "Degrees Kelvin ('K)", "Degrees Rankine ('R)");
factor[4] = new Array(1, 0.555555555555, 1, 0.555555555555);
tempIncrement = new Array(0, -32, -273.15, -491.67);

property[5] = "Time";
unit[5] = new Array("Second (sec)", "Day (mean solar)", "Hour (mean solar)", "Minute (mean solar)", "Month (mean calendar)", "Year (calendar)");
factor[5] = new Array(1, 8.640E4, 3600, 60, 2628000, 31536000);



function UpdateMenu(propMenu, unitMenu) {
  var i;
  i = propMenu.selectedIndex;
  FillMenuWithArray(unitMenu, unit[i]);
}

function FillMenuWithArray(myMenu, myArray) {
  var i;
  myMenu.length = myArray.length;
  for (i = 0; i < myArray.length; i++) {
    myMenu.options[i].text = myArray[i];
  }
}

function CalculateUnit(sourceForm, targetForm) {
  var sourceValue = sourceForm.unit_input.value;

  sourceValue = parseFloat(sourceValue);
  if (!isNaN(sourceValue) || sourceValue == 0) {
    sourceForm.unit_input.value = sourceValue;
    ConvertFromTo(sourceForm, targetForm);
  }
}

function ConvertFromTo(sourceForm, targetForm) {
  var propIndex;
  var sourceIndex;
  var sourceFactor;
  var targetIndex;
  var targetFactor;
  var result;

  propIndex = document.property_dropdown.the_menu.selectedIndex;

  sourceIndex = sourceForm.unit_menu.selectedIndex;
  sourceFactor = factor[propIndex][sourceIndex];

  targetIndex = targetForm.unit_menu.selectedIndex;
  targetFactor = factor[propIndex][targetIndex];


  result = sourceForm.unit_input.value;
 
  if (property[propIndex] == "Temperature") {
    result = parseFloat(result) + tempIncrement[sourceIndex];
  }
  result = result * sourceFactor;

  result = result / targetFactor;
  if (property[propIndex] == "Temperature") {
    result = parseFloat(result) - tempIncrement[targetIndex];
  }

  targetForm.unit_input.value = result;
}

window.onload = function(e) {
  FillMenuWithArray(document.property_dropdown.the_menu, property);
  UpdateMenu(document.property_dropdown.the_menu, document.form_first.unit_menu);
  UpdateMenu(document.property_dropdown.the_menu, document.form_second.unit_menu)
}

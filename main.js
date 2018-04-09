

var margin = {top: 10, right: 25, bottom: 35, left: 40 }
var width = 425 - margin.left - margin.right
var height = 225 - margin.top - margin.bottom
var svg = d3.select('.chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .call(responsivefy)
    .append('g')
    .attr('transform', 'translate('+ margin.left + ','+ margin.top +')')

svg.append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', 'lightblue')
    .attr('stroke', 'lightgreen')

// draw xAxis
var xScale = d3.scaleTime()
    .domain([new Date(2017,8,21,9,0), new Date(2017,8,21,10,0)])
    .range([0, width])
var xAxis = d3.axisBottom(xScale)
    .ticks(5)
    .tickSize(10)
    .tickPadding(5)
svg.append('g')
    .attr('transform', 'translate( 0,' + height + ')')
    .call(xAxis)

// draw yAxis
var yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0])
var yAxis = d3.axisLeft(yScale)
    .ticks(10)
    .tickSize(10)
    .tickPadding(10)
svg.append('g')
    .attr('transform', 'translate(' + margin.left + ', '+ margin.top + ')')
    .call(yAxis)


function responsivefy(svg) {
    // get container + svg aspect ratio
    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;

    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMid")
        .call(resize);

    // to register multiple listeners for same event type,
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3.select(window).on("resize." + container.attr("id"), resize);

    // get width of container and resize svg to fit it
    function resize() {
        var targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
    }
}

d3.graphScroll()

    .graph(d3.selectAll('.chart'))
    .container(d3.selectAll('.left'))
    .sections(d3.selectAll('.left1 > p'))
    .on('active', function(i){ console.log(i + 'th section active') })
    .offset(300)

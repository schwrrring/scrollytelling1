var margin = {top: 10, right: 25, bottom: 35, left: 40}
var width = 425 - margin.left - margin.right
var height = 225 - margin.top - margin.bottom



var svg = d3.select('.chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .call(responsivefy)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')



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
console.log('updated')
var xScale = d3.scaleBand()
    .range([0, width])
    .padding(0.1)
    .domain(['a', 'b', 'c'])

var yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0])
function update(data) {
    console.log('update is called');
    var bars = svg
        .selectAll('.bar')
        .data(data)

    bars.enter()
        .append('rect')
        .attr('fill', 'lightblue')
        .attr('class', 'bar')
        .merge(bars)
        .attr('fill', 'pink')
        .attr('x', function (d) {
            return xScale(d.x)
        })
        .attr('width', xScale.bandwidth())
        .attr('y', function (d) {
            return yScale(d.y)
        })
        .attr('height', function (d) {
            return height - yScale(d.y)
        })

    bars.exit().remove();
// draw xAxis

    var xAxis = d3.axisBottom(xScale)
        .ticks(5)
        .tickSize(10)
        .tickPadding(5)
    svg.append('g')
        .attr('transform', 'translate( 0,' + height + ')')
        .call(xAxis)

// draw yAxis

    var yAxis = d3.axisLeft(yScale)
        .ticks(10)
        .tickSize(10)
        .tickPadding(10)
    svg.append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
        .call(yAxis)
}


d3.graphScroll()

    .graph(d3.selectAll('.chart'))
    .container(d3.selectAll('.left'))
    .sections(d3.selectAll('.left1 > p'))
    .on('active', function (i) {
        animations[i](dataSteps[i]);

    })
    .offset(300)

var lastScrolled = 0;
var dataSteps = [
    [{'y': 20, 'x': 'a'}, {'x': 'b', 'y': 20}, {'x': 'c', 'y': 30}],
    [{'x': 'b', 'y': 30}, {'x': 'c', 'y': 20}],
    [{'y': 30, 'x': 'a'}, {'x': 'b', 'y': 20}, {'x': 'c', 'y': 30}],
    [{'y': 30, 'x': 'a'}, {'x': 'b', 'y': 30}],
    [{'x': 'b', 'y': 30}, {'x': 'c', 'y': 30}],
];

update(dataSteps[0])


var animations = [
    function (data) {

        if (lastScrolled == 0) {
            console.log("hallo", data);
            update(data);
            console.log(lastScrolled, 'lastScrolled')
            // var bars = d3.selectAll('.bar').data(data);
            // // .call(function(){console.log('kommt an')})
            // bars.exit().remove();
            // bars.enter().append('rect')
            //     .merge(bars)
            //     .attr('x', function (d) {
            //         console.log('passiert hier was?')
            //         return xScale(d.x)
            //     })
            //     .attr('width', xScale.bandwidth())
            //     .attr('y', function (d) {
            //         return yScale(d.y)
            //     })
            //     .attr('height', function (d) {
            //         return height - yScale(d.y)
            //     })
            //     .attr('fill', 'red')
            //     .attr('stroke', 'lightgreen')


        }
        else if (lastScrolled == 2) {
            console.log('the last thing you saw is 1', data)
            console.log(lastScrolled, 'lastScrolled')
            update(data)
            // var bars = d3.selectAll('.bar').data(data);
            // // .call(function(){console.log('kommt an')})
            // bars.exit().remove();
            // bars.enter().append('rect')
            //     .merge(bars)
            //     .attr('x', function (d) {
            //         console.log('passiert hier was?')
            //         return xScale(d.x)
            //     })
            //     .attr('width', xScale.bandwidth())
            //     .attr('y', function (d) {
            //         return yScale(d.y)
            //     })
            //     .attr('height', function (d) {
            //         return height - yScale(d.y)
            //     })
            //     .attr('fill', 'blue')
            //     .attr('stroke', 'lightgreen')


        }
        else {
            console.log('you just entered the game');
        }
        lastScrolled = 1;
    },
    function (data) {
        if (lastScrolled == 1) {
            console.log(data);
            update(data);
            console.log(lastScrolled, 'lastScrolled')
            // console.log("you came frome 1", data);
            // var bars = d3.selectAll('.bar').data(data);
            // // .call(function(){console.log('kommt an')})
            // bars.exit().remove();
            // bars.enter().append('rect')
            //     .merge(bars)
            //     .attr('x', function (d) {
            //         console.log('passiert hier was?')
            //         return xScale(d.x)
            //     })
            //     .attr('width', xScale.bandwidth())
            //     .attr('y', function (d) {
            //         return yScale(d.y)
            //     })
            //     .attr('height', function (d) {
            //         return height - yScale(d.y)
            //     })
            //     .attr('fill', 'red')
            //     .attr('stroke', 'lightgreen')


        }
        else if (lastScrolled == 3) {
            console.log('the last thing you saw is 2')
        }
        else {
            console.log('you just entered the game');
        }
        lastScrolled = 2;
    },
    function (data) {
        if (lastScrolled == 2) {
            update(data)
            console.log(lastScrolled, 'lastScrolled')
            console.log(data)

        }
        lastScrolled = 3;
    },
    function () {
        console.log(3)
    }
]

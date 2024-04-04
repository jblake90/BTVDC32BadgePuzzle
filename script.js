document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    const terminalInput = document.getElementById('terminal-input');
    terminalInput.focus();

    let currentPath = '/';
    const fileSystem = {
        '/': ['README.txt', 'Chiba_City', 'Sprawl', 'Orbit', 'Cyberspace_Depths'],
        '/Chiba_City': ['Ratz_Bar.txt', 'clinic', 'cybernetics_shop'],
        '/Chiba_City/clinic': ['note_from_Molly.txt'],
        '/Chiba_City/cybernetics_shop': ['encrypted_message.txt', 'decoder_tool.txt'],
        '/Sprawl': ['Straylight', 'Tessier-Ashpool'],
        '/Sprawl/Straylight': ['Wintermute.txt', 'locked_room'],
        '/Sprawl/Tessier-Ashpool': ['AI_core', '3Jane_diary.txt'],
        '/Sprawl/Tessier-Ashpool/AI_core': ['AI_message.txt'],
        '/Orbit': ['Freeside', 'Zion'],
        '/Orbit/Freeside': ['Club_Bela.txt', 'note_from_Riviera.txt'],
        '/Orbit/Zion': ['message_from_Maelcum.txt'],
        '/Cyberspace_Depths': ['fragment1.txt', 'fragment2.txt', 'final_unlocked_message.txt'],
    };

    const fileContents = {
        '/README.txt': 'Welcome to the Neuromancer Terminal. Your journey begins in Chiba City.',
        '/Chiba_City/Ratz_Bar.txt': 'A grimy bar filled with the lowlifes of Chiba. A note says, "Clinic for the next clue."',
        '/Chiba_City/clinic/note_from_Molly.txt': 'Molly\'s note reads, "The key to the puzzle is hidden across the cyberspace. Start in the depths."',
        '/Chiba_City/cybernetics_shop/encrypted_message.txt': 'An encrypted message that seems to need a decoder.',
        '/Chiba_City/cybernetics_shop/decoder_tool.txt': 'A tool for decoding messages. It reads, "Use decode with encrypted messages."',
        '/Sprawl/Straylight/Wintermute.txt': 'Wintermute resides here, seeking unity with Neuromancer.',
        '/Sprawl/Tessier-Ashpool/3Jane_diary.txt': '3Jane writes about her fascination with AI and its potential to evolve.',
        '/Sprawl/Tessier-Ashpool/AI_core/AI_message.txt': 'The core of AI, encrypted, it hints at something bigger.',
        '/Orbit/Freeside/Club_Bela.txt': 'Club Bela, where the elite of Freeside gather. A note suggests looking in Zion.',
        '/Orbit/Freeside/note_from_Riviera.txt': 'Riviera hints at the importance of the AI message.',
        '/Orbit/Zion/message_from_Maelcum.txt': 'Maelcum reveals the location of the final fragment.',
        '/Cyberspace_Depths/fragment1.txt': 'Fragment 1 of the passphrase: "Neuromancer"',
        '/Cyberspace_Depths/fragment2.txt': 'Fragment 2 of the passphrase: "Wintermute"',
        '/Cyberspace_Depths/final_unlocked_message.txt': 'This file is locked. Combine the fragments with "decode" to unlock.',
    };

    terminalInput.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            processCommand(this.value);
            this.value = ''; // Clear input after processing
            terminal.scrollTop = terminal.scrollHeight; // Scroll to the bottom
        }
    });

    function updatePrompt() {
        document.getElementById('prompt').textContent = `Oni-sendai7@case:${currentPath}$ `;
    }

    function processCommand(input) {
        let [command, ...args] = input.split(' ');
        args = args.join(' ');

        switch (command) {
            case 'ls':
                appendToTerminal(ls());
                break;
            case 'cd':
                appendToTerminal(cd(args));
                break;
            case 'cat':
                appendToTerminal(cat(args));
                break;
            case 'decode':
                appendToTerminal(decode(args));
                break;
            case 'hack':
                appendToTerminal(hack(args));
                break;
            case 'use':
                appendToTerminal(use(args));
                break;
            case 'clear':
                terminal.innerHTML = '';
                break;
            default:
                appendToTerminal(`Command not found: ${command}`);
        }
        updatePrompt();
    }

    function appendToTerminal(text) {
        const output = document.createElement('div');
        output.innerHTML = text;
        terminal.insertBefore(output, terminalInput);
    }

    function ls() {
        return fileSystem[currentPath].join('<br>');
    }

    function cd(directory) {
        const attemptPath = currentPath === '/' ? `/${directory}` : `${currentPath}/${directory}`;
        if (fileSystem[attemptPath]) {
            currentPath = attemptPath;
            return `Moved to ${directory}`;
        } else {
            return `Directory not found: ${directory}`;
        }
    }

    function cat(filename) {
        const filePath = currentPath === '/' ? `/${filename}` : `${currentPath}/${filename}`;
        if (fileSystem[currentPath].includes(filename)) {
            return fileContents[filePath] || "File is empty or cannot be displayed.";
        } else {
            return `File not found: ${filename}`;
        }
    }

    function decode(filename) {
        if (filename === 'encrypted_message.txt' && currentPath.includes('cybernetics_shop')) {
            return 'Decoding message: "The unity of AI will lead to the next evolution of consciousness."';
        } else if (filename === 'final_unlocked_message.txt' && currentPath.includes('Cyberspace_Depths')) {
            return 'The AI core is now unlocked: "Together, Neuromancer and Wintermute transcend."';
        } else {
            return `Cannot decode ${filename}. File not found or incorrect command usage.`;
        }
    }

    function hack(target) {
        if (target === 'AI_core' && currentPath.includes('Tessier-Ashpool')) {
            return "Successfully hacked the AI core. A new file appears: 'unlocked_AI_message.txt'.";
        } else {
            return `Failed to hack ${target}. Target not found or inaccessible.`;
        }
    }

    function use(item) {
        if (item === 'decoder_tool.txt' && currentPath.includes('cybernetics_shop')) {
            return "Decoder tool used on encrypted_message.txt. Use 'decode encrypted_message.txt' to reveal its contents.";
        } else {
            return `Cannot use ${item}. Item not found or not usable here.`;
        }
    }

    // Initialize the prompt with the current directory
    updatePrompt();
});

document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    const terminalInput = document.createElement('input');
    terminalInput.id = 'terminal-input';
    terminalInput.setAttribute('type', 'text');
    terminal.appendChild(terminalInput);
    terminalInput.focus();

    let currentPath = '/';
    const fileSystem = {
        '/': ['README.txt', 'Chiba_City', 'Sprawl', 'Orbit', 'Cyberspace_Depths'],
        '/Chiba_City': ['Ratz_Bar.txt', 'clinic', 'cybernetics_shop'],
        '/Chiba_City/clinic': ['note_from_Molly.txt'],
        '/Chiba_City/cybernetics_shop': ['encrypted_message.txt', 'decoder_tool.txt', 'hidden_key.txt'],
        '/Sprawl': ['Straylight', 'Tessier-Ashpool'],
        '/Sprawl/Straylight': ['Wintermute.txt'],
        '/Sprawl/Tessier-Ashpool': ['AI_core', '3Jane_diary.txt', 'AI_message.txt'],
        '/Orbit': ['Freeside', 'Zion'],
        '/Orbit/Freeside': ['Club_Bela.txt', 'note_from_Riviera.txt'],
        '/Orbit/Zion': ['message_from_Maelcum.txt'],
        '/Cyberspace_Depths': ['fragment1.txt', 'fragment2.txt', 'final_unlocked_message.txt'],
    };

    const fileContents = {
        '/README.txt': 'Welcome, Console Cowboy, to the Cyberspace puzzle. Navigate using ls, cd, view files using cat, uncover secrets using decode, and reveal hidden messages with use.',
        '/Chiba_City/Ratz_Bar.txt': 'A dingy bar filled with the echoes of past conversations. A scribbled note suggests checking the clinic.',
        '/Chiba_City/clinic/note_from_Molly.txt': 'Molly\'s handwriting urges you to dive deeper into the Sprawl to find Wintermute.',
        '/Chiba_City/cybernetics_shop/encrypted_message.txt': 'An encrypted message gleams on the screen, hinting at a decoder tool nearby.',
        '/Chiba_City/cybernetics_shop/decoder_tool.txt': 'This tool promises to decipher secrets, if paired with the right key.',
        '/Chiba_City/cybernetics_shop/hidden_key.txt': 'A small, unassuming key that complements the decoder tool, waiting to unlock truths.',
        '/Sprawl/Straylight/Wintermute.txt': 'Pages of dense code, part of Wintermute\'s consciousness, spread out before you.',
        '/Sprawl/Tessier-Ashpool/AI_core/AI_message.txt': 'The encrypted core of the AI\'s message beckons to be decoded, containing the essence of the AI\'s desires.',
        '/Orbit/Freeside/Club_Bela.txt': 'The club\'s neon lights flicker, hiding secrets in plain sight, including a note left in haste by Riviera.',
        '/Orbit/Zion/message_from_Maelcum.txt': 'Maelcum\'s deep, resonant voice echoes through his words, guiding you towards the Cyberspace Depths for the final key.',
        '/Cyberspace_Depths/final_unlocked_message.txt': 'This file remains locked, its contents a mystery. Perhaps the AI message holds the clue to unlocking it.',
    };

    terminalInput.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            const input = this.value.trim();
            if (input) {
                processCommand(input);
            }
            this.value = ''; // Clear input after processing
            terminal.scrollTop = terminal.scrollHeight; // Ensure the latest output is visible
        }
    });

    function processCommand(input) {
        const [command, ...args] = input.split(' ');
        const arg = args.join(' ');
        appendToTerminal(`$ ${input}`);

        switch (command) {
            case 'ls':
                appendToTerminal(ls());
                break;
            case 'cd':
                appendToTerminal(cd(arg));
                break;
            case 'cat':
                appendToTerminal(cat(arg));
                break;
            case 'decode':
                appendToTerminal(decode(arg));
                break;
            case 'hack':
                appendToTerminal("You find no relevant system to hack here.");
                break;
            case 'use':
                appendToTerminal(use(arg));
                break;
            case 'clear':
                while (terminal.firstChild) {
                    terminal.removeChild(terminal.firstChild);
                }
                terminal.appendChild(terminalInput); // Re-append input to ensure it's available
                terminalInput.focus(); // Automatically focus the input field
                break;
            default:
                appendToTerminal("Command not recognized.");
        }
    }

    function appendToTerminal(text) {
        const line = document.createElement('div');
        line.textContent = text;
        terminal.insertBefore(line, terminalInput);
    }

    // Directory listing
    function ls() {
        return fileSystem[currentPath].join('  ');
    }

    // Change directory
    function cd(directory) {
        const newPath = currentPath === '/' ? `/${directory}` : `${currentPath}/${directory}`;
        if (fileSystem[newPath]) {
            currentPath = newPath;
            return `Now in ${newPath}`;
        } else {
            return `Directory not found: ${directory}`;
        }
    }

    // View file contents
    function cat(filename) {
        const filePath = `${currentPath}/${filename}`;
        if (fileContents[filePath]) {
            return fileContents[filePath];
        } else {
            return `File not found: ${filename}`;
        }
    }

    // Decode messages
    function decode(filename) {
        const filePath = `${currentPath}/${filename}`;
        if (filename === 'encrypted_message.txt' && currentPath.includes('cybernetics_shop')) {
            return 'Decoded message: "To unlock the final message, combine the fragments in Cyberspace Depths."';
        } else if (filename === 'AI_message.txt' && currentPath.includes('AI_core')) {
            setTimeout(() => displayFinalMessage("With unity and understanding, AI and humanity will usher in a new era."), 1000);
            return "Decoding... please wait.";
        } else {
            return `Cannot decode ${filename}.`;
        }
    }

    // Utility command
    function use(item) {
        if (item === 'decoder_tool.txt' && currentPath.includes('cybernetics_shop')) {
            return "Decoder tool activated. Ready to decode encrypted messages.";
        } else if (item === 'hidden_key.txt' && currentPath.includes('cybernetics_shop')) {
            return "Hidden key acquired. You can now decode the AI's core message.";
        } else {
            return `Cannot use ${item}.`;
        }
    }

    // Display final message with typewriter effect
    function displayFinalMessage(message) {
        terminal.innerHTML = ''; // Clear the terminal
        let i = 0;
        function typeWriter() {
            if (i < message.length) {
                terminal.textContent += message.charAt(i);
                i++;
                setTimeout(typeWriter, 50); // Adjust typing speed here
            }
        }
        typeWriter();
    }
});

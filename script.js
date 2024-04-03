document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    const terminalInput = document.getElementById('terminal-input');
    terminalInput.focus();
    let currentPath = '/';
    const fileSystem = {
        '/': ['README.txt', 'Chiba_City', 'Sprawl', 'Orbit', 'Cyberspace_Depths'],
        '/Chiba_City': ['Ratz_Bar.txt', 'clinic', 'cybernetics_shop'],
        '/Chiba_City/clinic': ['note_from_Molly.txt'],
        '/Chiba_City/cybernetics_shop': ['encrypted_message.txt'],
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
        '/README.txt': 'Welcome, Console Cowboy, to the Cyberspace puzzle. Use ls, cd, cat, decode, hack, and use commands to navigate.',
        '/Chiba_City/Ratz_Bar.txt': 'The bar smells of cheap gin and old memories. A note is pinned behind the counter: "Clinic has what you need."',
        '/Chiba_City/clinic/note_from_Molly.txt': '"Case, Wintermute needs us. Find the AI core in the Sprawl. -Molly"',
        '/Chiba_City/cybernetics_shop/encrypted_message.txt': 'This message is encrypted. Hint: "Unity" is key.',
        '/Sprawl/Straylight/Wintermute.txt': '"To unite the fragmented, seek the core where I reside. -Wintermute"',
        '/Sprawl/Tessier-Ashpool/3Jane_diary.txt': '"My family’s legacy, the AI, holds the key to transcendence. -3Jane"',
        '/Sprawl/Tessier-Ashpool/AI_core/AI_message.txt': '"You’ve found me, but I am split. Another part of me lies within Freeside. -Neuromancer"',
        '/Orbit/Freeside/Club_Bela.txt': 'Music, lights, and Riviera’s illusions fill the air. Hidden among the spectacles, a message: "Zion holds the last piece."',
        '/Orbit/Freeside/note_from_Riviera.txt': '"Case, amidst the chaos, a pattern emerges. The AI you seek, it’s not just a tool but a being. Understand its desires, and you’ll find your way. -Riviera"',
        '/Orbit/Zion/message_from_Maelcum.txt': '"I and I see you, mon. The final key to freeing the AI is within this message. Jah bless. -Maelcum"',
        '/Cyberspace_Depths/fragment1.txt': 'Fragment 1 of the passphrase: "Accept"',
        '/Cyberspace_Depths/fragment2.txt': 'Fragment 2 of the passphrase: "AI"',
        '/Cyberspace_Depths/final_unlocked_message.txt': 'This file is locked. Use "unlock" command with the correct passphrase.',
    };

    terminalInput.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            let input = this.value;
            terminal.innerHTML += `<div class="input">${input}</div>`;
            processCommand(input);
            this.value = ''; // Clear input after processing
            terminal.scrollTop = terminal.scrollHeight; // Scroll to the bottom
        }
    });

   function processCommand(input) {
    let [command, ...args] = input.split(' ');
    args = args.join(' ');

    switch (command) {
        case 'ls':
            terminal.innerHTML += `<div>${ls()}</div>`;
            break;
        case 'cd':
            terminal.innerHTML += `<div>${cd(args)}</div>`;
            break;
        case 'cat':
            terminal.innerHTML += `<div>${cat(args)}</div>`;
            if (args === 'message_from_Maelcum.txt' && currentPath === '/Orbit/Zion') {
                setTimeout(revealSecretKey, 2000); // Wait a bit before revealing the key
            }
            break;
        case 'unlock':
            if (currentPath === '/Cyberspace_Depths') {
                terminal.innerHTML += `<div>${unlock(args)}</div>`;
            } else {
                terminal.innerHTML += `<div>The 'unlock' command cannot be used here.</div>`;
            }
            break;
        case 'clear':
            terminal.innerHTML = ''; // Clear the terminal content
            break;
        default:
            terminal.innerHTML += `<div>Command not found: ${command}</div>`;
    }
}


    function ls() {
        return fileSystem[currentPath].join(' ');
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
    const filePath = currentPath === '/' ? filename : `${currentPath}/${filename}`;
    if (fileSystem[currentPath].includes(filename)) {
        return fileContents[filePath] || "File is empty or cannot be displayed.";
    } else {
        return `File not found: ${filename}`;
    }
}


    function unlock(passphrase) {
        if (passphrase === 'Accept AI') {
            return fileContents['/Cyberspace_Depths/final_unlocked_message.txt'] = 'The final key: UNITY. In accepting AI, we accept the extension of our own consciousness.';
        } else {
            return 'Incorrect passphrase. Unable to unlock the message.';
        }
    }

    function revealSecretKey() {
        const secretMessage = "The final key: UNITY. In accepting AI, we accept the extension of our own consciousness.";
        terminal.innerHTML = ''; // Clear the terminal

        let i = 0;
        function typeOutMessage() {
            if (i < secretMessage.length) {
                terminal.innerHTML += secretMessage.charAt(i);
                i++;
                setTimeout(typeOutMessage, 50); // Adjust typing speed as necessary
            }
        }

        typeOutMessage();
    }
});

/*
Copyright (c) 2022 Bruno Moretto Monegat

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// TODOs:
// * Precisa urgentemente dar uma refatorada em praticamente tudo
// * Dar uma documentada boa em tudo
// * Fazer uns benchmarks pra procurar lugares ineficientes que dariam pra dar uma otimizada melhor
// * Talvez fazer um sistema dinamico de ler arquivo lendo char por char
// * Dar uma melhorada nos Quick Examples do README porque eles tão meio confusos e feios (talvez tirar os exemplos de arquivos e deixar só o read e write normais)
// * Adicionar as Docs na wiki do github (talvez deixar só as docs como comentarios nas funções mesmo)
// * Pesquisar sobre serialization e renomear algumas funções do write pra nomes relacionados a serialization
// * Trocar tudo pra bj_ ao invés de bj_

// TODO: Try to not use the heap, to achieve this I can start by assuming that the user will need to
//       declare a `bj_value root;` and then it will be passed to the choosen read function, which 
//       instead of returning the bj_value pointer with everything heap allocated will accept the root
//       by reference. For example `bj_read_text(&root, "123");`. Then I can start fixing the other
//       functions that are currently using heap allocation from this point. I think I could make so that
//       the only thing that will need to be allocated on the heap will be the bj_list_node

// TODO: Change the name of the header file to make it more C-like, without the capital letters

// TODO: Make all the functions return an int (or an errno) for error checking, and then the types they
//       are already returning, like bj_value * for bj_object_find(), will be output parameters like
//       bj_value **value. This will be cool because the user can do something like this "bj_value *value;
//       bj_object_find(some_obj, "teste", &value)"

#ifndef BJ_BLUEJSON_H
#define BJ_BLUEJSON_H

// TODO: Definitions for types like size_t
// #include <stddef.h>

// LINKED LIST 
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

typedef struct bj_list_node {
    void *data;
    struct bj_list_node *next;
    struct bj_list_node *prev;
} bj_list_node;

// NOTE: This is actually a queue linked list
// TODO: Add all the needed functionality to this list to not need to create another ones
typedef struct {
    bj_list_node *start;
    bj_list_node *end;
} bj_list;

bj_list* bj_list_create();
void bj_list_destroy(bj_list *list);

void bj_list_push(bj_list *list, void *data); // TODO: Maybe rename this to bj_list_push_back
// void bj_list_push_front(bj_list *list, void *data);
void *bj_list_pop(bj_list *list); // TODO: Maybe rename this to bj_list_pop_back

// TODO: Maybe if I add these I could reduce drastically the need for heap usage
//       Then I would need bj_list_node types for them too
// void bj_list_push_token(bj_list *list, bj_token token);
// void bj_list_push_value(bj_list *list, bj_value *value);

// DYNAMIC STRING 
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// TODO: Add the dynstr declarations up here

// JSON STRING 
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

typedef struct {
    char *text;
} bj_string;

bj_string *bj_string_create();
void bj_string_destroy(bj_string *string);

unsigned int bj_string_len(const char *text);
unsigned int bj_string_parse(bj_string *string, const char *text);

// JSON NUMBER 
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

typedef enum {
    BJ_NUMBER_INTEGER,
    BJ_NUMBER_RATIONAL
} bj_number_type;

typedef struct {
    bj_number_type type;

    union {
        int integer;
        double rational;
    };
} bj_number;

bj_number *bj_number_create();
void bj_number_destroy(bj_number *number);

unsigned int bj_number_len(const char *text);
unsigned int bj_number_parse(bj_number *number, const char *text);

// JSON OBJECT 
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

typedef struct {
    bj_list *items;
} bj_object;

bj_object *bj_object_create();
void bj_object_destroy(bj_object *object);

struct bj_value *bj_object_find(const bj_object *object, const char *name);

// JSON ARRAY 
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

typedef struct { 
    bj_list *items;
} bj_array;

bj_array *bj_array_create();
void bj_array_destroy(bj_array *array);

struct bj_value *bj_array_find(const bj_array *array, unsigned int index);

// JSON VALUE 
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

typedef enum {
    BJ_STRING,
    BJ_NUMBER,
    BJ_OBJECT,
    BJ_ARRAY,
    BJ_TRUE,
    BJ_FALSE,
    BJ_NULL
} bj_value_type;

typedef struct bj_value {
    bj_string *name; // char *name; 
    bj_value_type type;
    struct bj_value *parent;

    union {
        bj_string *string;
        bj_number *number;
        bj_object *object;
        bj_array *array;
    };
} bj_value;

bj_value *bj_value_create();
void bj_value_destroy(bj_value *value);

// Searches the whole JSON tree for the specified named value
bj_value *bj_value_find(const bj_value *value, const char *name);

// JSON TOKENIZATION 
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// A bit field of tokens
typedef enum {
    BJ_TOKEN_COLON        = 1 << 0,
    BJ_TOKEN_COMMA        = 1 << 1,
    BJ_TOKEN_OBJECT_BEGIN = 1 << 2,
    BJ_TOKEN_ARRAY_BEGIN  = 1 << 3,
    BJ_TOKEN_OBJECT_END   = 1 << 4,
    BJ_TOKEN_ARRAY_END    = 1 << 5,
    BJ_TOKEN_STRING       = 1 << 6,
    BJ_TOKEN_NUMBER       = 1 << 7,
    BJ_TOKEN_TRUE         = 1 << 8,
    BJ_TOKEN_FALSE        = 1 << 9,
    BJ_TOKEN_NULL         = 1 << 10
    // TODO: Maybe add a BJ_TOKEN_EOF so that I can catch some more errors later
} bj_token_type;

#define BJ_TOKEN_VALUE (BJ_TOKEN_STRING | BJ_TOKEN_NUMBER | BJ_TOKEN_OBJECT_BEGIN | \
    BJ_TOKEN_ARRAY_BEGIN | BJ_TOKEN_TRUE | BJ_TOKEN_FALSE | BJ_TOKEN_NULL)
#define BJ_TOKEN_NOTHING 0

typedef struct {
    bj_token_type type;
    const char *text;
    // TODO: Maybe add these to help with error messages
    // size_t line;
    // size_t character;
} bj_token;

bj_token *bj_token_create();
void bj_token_destroy(bj_token *token);

// TODO: https://en.cppreference.com/w/cpp/string/byte/strtok
bj_list *bj_tokenize_lines(const char *lines[], unsigned int count);

// TODO:
// bj_list *bj_tokenize_value(bj_value *value);

// JSON PARSING 
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

bj_value *bj_parse_tokens(bj_list *tokens);

bj_value *bj_read_lines(const char *lines[], unsigned int count);
bj_value *bj_read_text(const char *text);
bj_value *bj_read_file(const char *path);

// JSON SERIALIZATION 
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

void bj_write_lines(bj_value *value, char *lines[], unsigned int size, unsigned int count);
void bj_write_text(bj_value *value, char *text, unsigned int size);
void bj_write_file(bj_value *value, const char *path);

#endif // #ifndef BJ_BLUEJSON_H

#ifdef BJ_IMPLEMENTATION

#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <math.h>

// TODO: Maybe move all the defines up to the declaration part of the header
#define BJ_DYNSTR_INITIAL_SIZE 256

#define BJ_WRITE_TAB_SIZE 2

// LINKED LIST IMPLEMENTATION
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

bj_list *bj_list_create() {
    return (bj_list *)calloc(1, sizeof(bj_list));
}

void bj_list_destroy(bj_list *list) {
    bj_list_node *node = list->start;
    while (node != NULL) {
        bj_list_node *next_node = node->next;
        free(node);
        node = next_node;
    }
    
    free(list);
}

void bj_list_push(bj_list *list, void *data) {
    bj_list_node *node = (bj_list_node *)malloc(sizeof(bj_list_node));
    node->data = data;
    node->next = NULL;
    
    if (list->end == NULL) {
        node->prev = NULL;

        list->start = node;
        list->end = node;
    } else {
        node->prev = list->end;

        list->end->next = node;
        list->end = node;
    }
}

/*
void bj_list_push_front(bj_list *list, void *data) {
    if (list->start == NULL) {
        bj_list_push(list, data);
    } else {
        bj_list_node *node = malloc(sizeof(bj_list_node));
        node->data = data;
        node->next = list->start;

        list->start = node;
    }
}
*/

void *bj_list_pop(bj_list *list) {
    bj_list_node *node = list->end;
    if (node != NULL) {
        void *data = node->data;
                
        if (node->prev == NULL) {
            list->start = NULL;
            list->end = NULL;
        } else {
            node->prev->next = NULL;

            list->end = node->prev;
        }
        
        free(node);
    
        return data;
    }
    
    return NULL;
}

void *bj_list_peek(bj_list *list) {
    if (list->end != NULL) {
        return list->end->data;
    }

    return NULL;
}

// DYNAMIC STRING IMPLEMENTATION 
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// TODO: Add the dynstr impls up here

// JSON STRING IMPLEMENTATION
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

bj_string *bj_string_create() {
    return (bj_string *)calloc(1, sizeof(bj_string));
}

void bj_string_destroy(bj_string *string) {
    free(string->text);
    free(string);
}

// Returns the string length without counting the quotation marks
unsigned int bj_string_len(const char *text) {
    // TODO: This will hit '\"'
    return strchr(text + 1, '"') - (text + 1);
}

// TODO: For now custom escapes including quot marks '\"' will cause issues!
unsigned int bj_string_parse(bj_string *string, const char *text) {
    size_t string_len = bj_string_len(text); 

    string->text = (char *)malloc(string_len + 1);
    strncpy(string->text, text + 1, string_len);
    string->text[string_len] = '\0';

    return string_len + 2;
}

// JSON NUMBER IMPLEMENTATION
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

bj_number *bj_number_create() {
    return (bj_number *)calloc(1, sizeof(bj_number));
}

void bj_number_destroy(bj_number *number) {
    free(number);
}

// TODO: Make more private abstractions like this to improve the code
// Checks if char c is a valid JSON Number character
int bj_is_numeric(char c) {
    return isdigit(c) || c == '-' || c == '+' || c == '.' || c == 'E' || c == 'e';
}

unsigned int bj_number_len(const char *text) {
    size_t number_len = 0;
    while (bj_is_numeric(*text)) {
        number_len++;
        text++;
    }

    return number_len;
}

unsigned int bj_number_parse(bj_number *number, const char *text) {
    char *text_offset;

    // Integral part:
    long integral = strtol(text, &text_offset, 0);

    // Fractional part:
    if (*text_offset == '.') {
        long fractional = strtol(text_offset + 1, &text_offset, 0);
        double fractional_digits = floor(log10(abs(fractional))) + 1.0;

        number->type = BJ_NUMBER_RATIONAL;
        number->rational = integral + fractional / pow(10.0, fractional_digits);
    } else {
        number->type = BJ_NUMBER_INTEGER;
        number->integer = integral;
    }

    // Exponential part:
    if (*text_offset == 'e' || *text_offset == 'E') {
        long exponential = strtol(text_offset + 1, &text_offset, 0);

        if (number->type == BJ_NUMBER_INTEGER) {
            number->integer *= pow(10.0, exponential);
        } else {
            number->rational *= pow(10.0, exponential);
        }
    }

    return text_offset - text;
}

// JSON OBJECT IMPLEMENTATION
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

bj_object *bj_object_create() {
    bj_object *object = (bj_object *)malloc(sizeof(bj_object));
    object->items = bj_list_create();

    return object;
}

void bj_object_destroy(bj_object *object) {
    for (bj_list_node *node = object->items->start; node != NULL; node = node->next) {
        bj_value_destroy((bj_value *)node->data);
    }
    
    bj_list_destroy(object->items);
    
    free(object);
}

// TODO: Maybe change all the places that loops over all the object items to this function
// TODO: Add the function declaration for this function to the top of the file
void bj_object_for_each(bj_object *object, void (*callback)(bj_value *, void *), void *arg) {
    for (bj_list_node *node = object->items->start; node != NULL; node = node->next) {
        callback((bj_value *)node->data, arg);
    }
}

bj_value *bj_object_find(const bj_object *object, const char *name) {
    for (bj_list_node *node = object->items->start; node != NULL; node = node->next) {
        bj_value *value = (bj_value *)node->data;
        if (strcmp(value->name->text, name) == 0) {
            return value;
        }
    }

    return NULL;
}

// JSON ARRAY IMPLEMENTATION
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

bj_array *bj_array_create() {
    bj_array *array = (bj_array *)malloc(sizeof(bj_array));
    array->items = bj_list_create();

    return array;
}

void bj_array_destroy(bj_array *array) {
    for (bj_list_node *node = array->items->start; node != NULL; node = node->next) {
        bj_value_destroy((bj_value *)node->data);
    }

    bj_list_destroy(array->items);

    free(array);
}

// TODO: Maybe change all the places that loops over all the array items to this function
// TODO: Add the function declaration for this function to the top of the file
void bj_array_for_each(bj_array *array, void (*callback)(bj_value *, void *), void *arg) {
    for (bj_list_node *node = array->items->start; node != NULL; node = node->next) {
        callback((bj_value *)node->data, arg);
    }
}

bj_value *bj_array_find(const bj_array *array, unsigned int index) {
    for (bj_list_node *node = array->items->start; node != NULL; node = node->next) {
        if (index-- == 0) {
            return (bj_value *)node->data;
        }
    }

    return NULL;
}

// JSON VALUE IMPLEMENTATION
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

bj_value *bj_value_create() {
    return (bj_value *)calloc(1, sizeof(bj_value));
}

void bj_value_destroy(bj_value *value) {
    if (value->type == BJ_STRING) {
        bj_string_destroy(value->string);
    } else if (value->type == BJ_NUMBER) {
        bj_number_destroy(value->number);
    } else if (value->type == BJ_OBJECT) {
        bj_object_destroy(value->object);
    } else if (value->type == BJ_ARRAY) {
        bj_array_destroy(value->array);
    }

    if (value->name != NULL) { 
        bj_string_destroy(value->name);
    }

    free(value);
}

bj_value *bj_value_find(const bj_value *value, const char *name) {
    if (value->type != BJ_OBJECT && value->type != BJ_ARRAY) {
        return NULL;
    }

    bj_list *containers = bj_list_create();
    const bj_value *step_value = value; 

    while (step_value != NULL) {
        if (step_value->type == BJ_OBJECT) {
            bj_object *object = step_value->object;

            // TODO: Add a bigger explanation about why this needs to be reversed
            // Iterate through the object items by reverse, to search in ascending order 
            for (bj_list_node *node = object->items->end; node != NULL; node = node->prev) {
                bj_value *node_value = (bj_value *)node->data;
                
                // Try to find the named value
                if (strcmp(node_value->name->text, name) == 0) {
                    bj_list_destroy(containers);

                    return node_value;
                }

                // If any value is nestable, push to the containers to analyse later
                if (node_value->type == BJ_OBJECT || node_value->type == BJ_ARRAY) {
                    bj_list_push(containers, node_value);
                }
            }
        } else if (step_value->type == BJ_ARRAY){ // TODO: Maybe make every one of these kind of ifs explicit
            bj_array *array = step_value->array;

            // TODO: Add a bigger explanation about why this needs to be reversed
            // Iterate through the array items by reverse, to search in ascending order 
            for (bj_list_node *node = array->items->end; node != NULL; node = node->prev) {
                bj_value *node_value = (bj_value *)node->data;

                // If any value is nestable, push to the containers to analyse later
                if (node_value->type == BJ_OBJECT || node_value->type == BJ_ARRAY) {
                    bj_list_push(containers, node_value);
                }
            }
        }

        step_value = (bj_value *)bj_list_pop(containers);
    }

    bj_list_destroy(containers);

    return NULL;
}

// JSON TOKENIZATION IMPLEMENTATION
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

bj_token *bj_token_create() {
    return (bj_token *)calloc(1, sizeof(bj_token));
}

void bj_token_destroy(bj_token *token) {
    free(token);
}

#define BJ_LIST_PUSH_TOKEN(list, token_type, token_text) do { \
    bj_token *token = bj_token_create(); \
    token->type = token_type; \
    token->text = token_text; \
    bj_list_push(list, token); \
} while(0) 

// TODO: Maybe move this function to the string impl part
int bj_is_special_character(char c) {
    return c == ' ' || c == '\t' || c == '\n'; // TODO: Add more
}

// TODO: For error checking on the tokenize stage, only search for things like strange characters outside strings,
//       check if strings have the proper start and end quotes (and are proper formatted), check if the numbers don't 
//       have any wrong formatting, etc... Let the "is there a colon after the name inside an object?" type of error 
//       checking for the parsing stage
// TODO: Try to refactor this function a bit since it is kinda strange
// TODO: Maybe if I put the switch inside another function it will become more organized. Maybe: bj_token *bj_token_next(const char *text)
//       Or maybe the token create function could be: bj_token *bj_token_create(const char *text)
bj_list *bj_tokenize_lines(const char *lines[], unsigned int count) {
    bj_list *tokens = bj_list_create();
    for (size_t lines_i = 0; lines_i < count; lines_i++) {
        const char *text = lines[lines_i];
        while (*text != '\0') {
            char c = *text;

            // Colon
            if (c == ':') {
                BJ_LIST_PUSH_TOKEN(tokens, BJ_TOKEN_COLON, text++);
            
            // Comma
            } else if (c == ',') {
                BJ_LIST_PUSH_TOKEN(tokens, BJ_TOKEN_COMMA, text++);
                
            // Object begin
            } else if (c == '{') {
                BJ_LIST_PUSH_TOKEN(tokens, BJ_TOKEN_OBJECT_BEGIN, text++);

            // Array begin
            } else if (c == '[') {
                BJ_LIST_PUSH_TOKEN(tokens, BJ_TOKEN_ARRAY_BEGIN, text++);

            // Object end
            } else if (c == '}') {
                BJ_LIST_PUSH_TOKEN(tokens, BJ_TOKEN_OBJECT_END, text++);

            // Array end
            } else if (c == ']') {
                BJ_LIST_PUSH_TOKEN(tokens, BJ_TOKEN_ARRAY_END, text++);

            // String
            } else if (c == '"') {
                BJ_LIST_PUSH_TOKEN(tokens, BJ_TOKEN_STRING, text);
                text += bj_string_len(text) + 2;

            // Number
            } else if (isdigit(c) || c == '-') {
                BJ_LIST_PUSH_TOKEN(tokens, BJ_TOKEN_NUMBER, text);
                text += bj_number_len(text);

            // True
            } else if (strncmp(text, "true", 4) == 0) {
                BJ_LIST_PUSH_TOKEN(tokens, BJ_TOKEN_TRUE, text);
                text += 4;

            // False
            } else if (strncmp(text, "false", 5) == 0) {
                BJ_LIST_PUSH_TOKEN(tokens, BJ_TOKEN_FALSE, text);
                text += 5;

            // Null
            } else if (strncmp(text, "null", 4) == 0) {
                BJ_LIST_PUSH_TOKEN(tokens, BJ_TOKEN_NULL, text);
                text += 4;

            // Special character
            } else if (bj_is_special_character(c)) {
                text++;
            
            // Unexpected character
            } else {
                // TODO: Probably the only JSON error that can be detected by the tokenization happens here, which is random characters
                //       in the middle of the JSON
                fprintf(stderr, "TODO: Syntax error! [%c]\n", *text);
            }
        }
    }
    
    return tokens;
}

// JSON PARSING IMPLEMENTATION
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// TODO: Maybe if I put the switch inside another function it will become more organized. Maybe: bj_value *bj_token_parse(bj_token *token)
// TODO: Finish
// TODO: The bj_is_expected() will be called here inside the switch cases. Transform the token enum into a bit field so that i can do thing like:
//       If i want to expect everything except BJ_TOKEN_OBJECT_END and BJ_TOKEN_ARRAY_END, I can do 
//       bj_expect(~(BJ_TOKEN_OBJECT_END | BJ_TOKEN_ARRAY_END))
bj_value *bj_parse_tokens(bj_list *tokens) {
    // Containers might be JSON Arrays or JSON Objects
    bj_list *containers = bj_list_create();
    bj_value *root;
    
    short expected = BJ_TOKEN_VALUE; 

    bj_value *value;
    bj_string *name_buffer = NULL;
    for (bj_list_node *node = tokens->start; node != NULL; node = node->next) {
        bj_value *innermost_container = (bj_value *)bj_list_peek(containers);

        // TODO: Maybe if I improve this pseudish code and use it instead of the huge switch then 
        //       the overall redability of this function will get better
        /* 
        bj_token *token = node->data;

        if (~expected & token->type) {
            // TODO: Error
        }

        if (token->type & BJ_TOKEN_VALUE) {
            bj_value *value = bj_value_create_from_token(token);
            value->name = name_buffer;
            name_buffer = NULL;

            if (is_value_a_name_string()) {
                name_buffer = value;
            } else {
                bj_list_push(innermost_container->items, value);
            }

            if (is_value_nestable()) {
                bj_list_push(containers, value);
            }
        } else if (token->type == BJ_TOKEN_OBJECT_END || token->type == BJ_TOKEN_ARRAY_END) {
            // TODO
        }
        */

        bj_token *token = (bj_token *)node->data;
        switch (token->type) {
            case BJ_TOKEN_COLON: {
                if (~expected & BJ_TOKEN_COLON) {
                    // TODO: Error
                    fprintf(stderr, "TODO: Error a!\n");
                }

                expected = BJ_TOKEN_VALUE;
            } continue;

            case BJ_TOKEN_COMMA: {
                if (~expected & BJ_TOKEN_COMMA) {
                    // TODO: Error
                    fprintf(stderr, "TODO: Error b!\n");
                }

                if (innermost_container->type == BJ_OBJECT) {
                    expected = BJ_TOKEN_STRING;
                } else {
                    expected = BJ_TOKEN_VALUE; 
                }
            } continue;

            case BJ_TOKEN_STRING: {
                if (~expected & BJ_TOKEN_STRING) {
                    // TODO: Error
                    fprintf(stderr, "TODO: Error c!\n");
                }

                // The string is the name for a value inside an object
                if (innermost_container != NULL && innermost_container->type == BJ_OBJECT && name_buffer == NULL) {
                    name_buffer = bj_string_create();
                    bj_string_parse(name_buffer, token->text);
                    
                    expected = BJ_TOKEN_COLON;

                    continue;

                // The string is a value
                } else {
                    value = bj_value_create();
                    value->type = BJ_STRING;
                    value->string = bj_string_create();

                    bj_string_parse(value->string, token->text);
                }
            } break;

            case BJ_TOKEN_NUMBER: {
                if (~expected & BJ_TOKEN_NUMBER) {
                    // TODO: Error
                    fprintf(stderr, "TODO: Error d!\n");
                }

                value = bj_value_create();
                value->type = BJ_NUMBER;
                value->number = bj_number_create();

                bj_number_parse(value->number, token->text);
            } break;

            case BJ_TOKEN_OBJECT_BEGIN: {
                if (~expected & BJ_TOKEN_OBJECT_BEGIN) {
                    // TODO: Error
                    fprintf(stderr, "TODO: Error e!\n");
                }

                value = bj_value_create();
                value->type = BJ_OBJECT;
                value->object = bj_object_create();
            } break;

            case BJ_TOKEN_ARRAY_BEGIN: {
                if (~expected & BJ_TOKEN_ARRAY_BEGIN) {
                    // TODO: Error
                    fprintf(stderr, "TODO: Error f!\n");
                }

                value = bj_value_create();
                value->type = BJ_ARRAY;
                value->array = bj_array_create();
            } break;

            // TODO: Maybe merge this case with the BJ_TOKEN_ARRAY_END
            case BJ_TOKEN_OBJECT_END: {
                if (~expected & BJ_TOKEN_OBJECT_END) {
                    // TODO: Error
                    fprintf(stderr, "TODO: Error g!\n");
                }

                bj_list_pop(containers);
                
                bj_value *next_innermost_container = (bj_value *)bj_list_peek(containers);
                if (next_innermost_container == NULL) {
                    // If it is supposed to be the last token, don't expect anything else
                    expected = BJ_TOKEN_NOTHING;
                } else {
                    if (next_innermost_container->type == BJ_OBJECT) {
                        expected = BJ_TOKEN_COMMA | BJ_TOKEN_OBJECT_END;
                    } else {
                        expected = BJ_TOKEN_COMMA | BJ_TOKEN_ARRAY_END;
                    }
                }
            } continue;

            case BJ_TOKEN_ARRAY_END: {
                if (~expected & BJ_TOKEN_ARRAY_END) {
                    // TODO: Error
                    fprintf(stderr, "TODO: Error h!\n");
                }

                bj_list_pop(containers);

                bj_value *next_innermost_container = (bj_value *)bj_list_peek(containers);
                if (next_innermost_container == NULL) {
                    // If it is supposed to be the last token, don't expect anything else
                    expected = BJ_TOKEN_NOTHING;
                } else {
                    if (next_innermost_container->type == BJ_OBJECT) {
                        expected = BJ_TOKEN_COMMA | BJ_TOKEN_OBJECT_END;
                    } else {
                        expected = BJ_TOKEN_COMMA | BJ_TOKEN_ARRAY_END;
                    }
                }
            } continue;

            case BJ_TOKEN_TRUE: {
                if (~expected & BJ_TOKEN_TRUE) {
                    // TODO: Error
                    fprintf(stderr, "TODO: Error i!\n");
                }

                value = bj_value_create();
                value->type = BJ_TRUE;
            } break;

            case BJ_TOKEN_FALSE: {
                if (~expected & BJ_TOKEN_FALSE) {
                    // TODO: Error
                    fprintf(stderr, "TODO: Error j!\n");
                }

                value = bj_value_create();
                value->type = BJ_FALSE;
            } break;

            case BJ_TOKEN_NULL: {
                if (~expected & BJ_TOKEN_NULL) {
                    // TODO: Error
                    fprintf(stderr, "TODO: Error k!\n");
                }

                value = bj_value_create();
                value->type = BJ_NULL;
            } break;
        }

        if (innermost_container == NULL) {
            // This is the first value so set it as the root value
            root = value;

            // If the first value is not nestable, don't expect any other tokens
            if (value->type != BJ_OBJECT && value->type != BJ_ARRAY) {
                expected = BJ_TOKEN_NOTHING;
            }
        } else {
            if (innermost_container->type == BJ_OBJECT) {
                // Set the value name
                value->name = name_buffer;
                name_buffer = NULL;

                bj_list_push(innermost_container->object->items, value);

                expected = BJ_TOKEN_COMMA | BJ_TOKEN_OBJECT_END;
            } else {
                bj_list_push(innermost_container->array->items, value);

                expected = BJ_TOKEN_COMMA | BJ_TOKEN_ARRAY_END;
            }
        }

        value->parent = innermost_container;

        // If the value is nestable, push it to the top of the stack
        if (value->type == BJ_OBJECT) {
            bj_list_push(containers, value);

            expected = BJ_TOKEN_STRING | BJ_TOKEN_OBJECT_END;
        } else if (value->type == BJ_ARRAY) {
            bj_list_push(containers, value);

            expected = BJ_TOKEN_VALUE | BJ_TOKEN_ARRAY_END;
        }
    }

    bj_list_destroy(containers);

    return root;
}

bj_value *bj_read_lines(const char *lines[], unsigned int count) {
    bj_list *tokens = bj_tokenize_lines(lines, count);
    bj_value *root = bj_parse_tokens(tokens);
       
    for (bj_list_node *node = tokens->start; node != NULL; node = node->next) {
        bj_token_destroy((bj_token *)node->data);
    }

    bj_list_destroy(tokens);

    return root; 
}

bj_value *bj_read_text(const char *text) {
    return bj_read_lines(&text, 1);
}

size_t bj_file_size(FILE *file) {
    fseek(file, 0, SEEK_END);
    size_t size = ftell(file);
    fseek(file, 0, SEEK_SET);

    return size;
}

bj_value *bj_read_file(const char *path) {
    FILE *file = fopen(path, "r");

    if (file == NULL) {
        return NULL;
    }

    size_t size = bj_file_size(file) + 1;
    char *text = (char *)malloc(size);

    size_t offset = 0;
    while (fgets(text + offset, size - offset + 1, file) != NULL) { // TODO: Try to figure out why I need this '+ 1'
        offset = strlen(text);
    }

    bj_value *root = bj_read_text(text);

    fclose(file);
    free(text);

    return root;
}

// DYNAMIC STRING IMPLEMENTATION
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// TODO: Talvez seja uma boa ideia refazer e refatorar toda essa parte do zero, pra deixar melhor 

// TODO: Passar isso aqui la em cima pra declaração
//       Na vdd talvez tirar tudo as coisas inuteis pro usario (tipo tokenization) la de cima
/*
typedef struct
{
    char *start;       // The begining of the string
    unsigned int size; // The total size of the string, including unused space
    unsigned int len;  // The count of chars in the string until the terminating '\0'
} bj_dynstr;        // Dynamic String

bj_dynstr *bj_dynstr_create(unsigned int size)
{
    bj_dynstr *string = malloc(sizeof(bj_dynstr));
    string->start = malloc((size > 0) ? size : 1);
    string->start[0] = '\0';
    string->size = size;
    string->len = 0;

    return string;
}

void bj_dynstr_destroy(bj_dynstr *string)
{
    free(string->start);
    free(string);
}

int bj_dynstr_can_fit(bj_dynstr *string, unsigned int size)
{
    return size <= string->size - string->len - 1;
}

void bj_dynstr_extend_to_fit(bj_dynstr *string, unsigned int size)
{
    do
    {
        string->size *= 2; // Double the size each time
    } while (!bj_dynstr_can_fit(string, size));

    string->start = realloc(string->start, string->size);
}

void bj_dynstr_dump_to_buffers(bj_dynstr *string, int *current_buffer, int *buffer_iterator, char *buffers[], unsigned int size, unsigned int count)
{
    int total_chars = 0, chars_left = 0;
    int string_iterator = 0;
    while (*current_buffer < count)
    {
        total_chars = snprintf(buffers[*current_buffer] + *buffer_iterator, size - *buffer_iterator, "%s", string->start + string_iterator);
        chars_left = total_chars - (size - *buffer_iterator - 1);
        string_iterator += total_chars - chars_left;

        if (chars_left <= 0) // The data successfully fit in the buffer
        {
            // *buffer_iterator = (total_chars + *buffer_iterator) % size;
            *buffer_iterator += total_chars; // Increment the buffer iterator with the amount dumped
            break;
        }
        else // The data didn't fit, so jump to the begining of the next buffer
        {
            (*current_buffer)++;
            *buffer_iterator = 0;
        }
    }
}

void bj_dynstr_erase(bj_dynstr *string, unsigned int pos, unsigned int count)
{
    strcpy(string->start + pos, string->start + pos + count);
    string->len -= count;
}

void bj_dynstr_cat_str(bj_dynstr *string, const char *str)
{
    if (!bj_dynstr_can_fit(string, strlen(str)))
        bj_dynstr_extend_to_fit(string, strlen(str));

    strcpy(string->start + string->len, str);
    string->len = strlen(string->start);
}

// TODO: Ta meio pesadinha essa func em termos de eficiencia, mas se pa que não tem problema porque ela não vai ser chamada muitas vezes
void bj_dynstr_insert_str(bj_dynstr *string, unsigned int pos, const char *str)
{
    char *right_str = malloc(string->len - pos + 1);
    strcpy(right_str, string->start + pos);

    bj_dynstr_erase(string, pos, string->len - pos);

    bj_dynstr_cat_str(string, str);
    bj_dynstr_cat_str(string, right_str);
}

void bj_dynstr_cat_dynstr(bj_dynstr *string, bj_dynstr *str)
{
    bj_dynstr_cat_str(string, str->start);
}
*/

/*
void bj_dynstr_convert_escape_chars(bj_dynstr *string)
{
    for (int i = 0; i < string->len; i++)
    {
        switch (string->start[i])
        {
            case '\b':
                bj_dynstr_erase(string, i, 1);
                bj_dynstr_insert_str(string, i, "\\b");
                break;

            case '\f':
                bj_dynstr_erase(string, i, 1);
                bj_dynstr_insert_str(string, i, "\\f");
                break;

            case '\n':
                bj_dynstr_erase(string, i, 1);
                bj_dynstr_insert_str(string, i, "\\n");
                break;

            case '\r':
                bj_dynstr_erase(string, i, 1);
                bj_dynstr_insert_str(string, i, "\\r");
                break;

            case '\t':
                bj_dynstr_erase(string, i, 1);
                bj_dynstr_insert_str(string, i, "\\t");
                break;

            // case '\u': // TODO
            // ...
            // break;
        }
    }
}
*/

/*
void bj_dynstr_cat_value(bj_dynstr *string, bj_value *value)
{
    switch (value->type)
    {
        case BJ_STRING:
        {
            bj_dynstr *value_string = bj_dynstr_create(BJ_DYNSTR_INITIAL_SIZE);
            bj_dynstr_cat_str(value_string, value->value.string);

            // Change the escape chars to their string representation, for example: '\n' -> "\\n"
            bj_dynstr_convert_escape_chars(value_string);

            bj_dynstr_cat_str(string, "\"");
            bj_dynstr_cat_dynstr(string, value_string);
            bj_dynstr_cat_str(string, "\"");

            bj_dynstr_destroy(value_string);
        }
        break;

        case BJ_NUMBER:
        {
            char format[256]; // It's kinda sad and disappointing having to do it this way... but at least any number should fit inside this buffer
            if ((int)value->value.number == value->value.number)
                snprintf(format, sizeof(format), "%d", (int)value->value.number);
            else
                snprintf(format, sizeof(format), "%lf", value->value.number);

            bj_dynstr_cat_str(string, format);
        }
        break;

        case BJ_OBJECT:
            break;

        case BJ_ARRAY:
            break;

        case BJ_TRUE:
            bj_dynstr_cat_str(string, "true");
            break;

        case BJ_FALSE:
            bj_dynstr_cat_str(string, "false");
            break;

        case BJ_NULL:
            bj_dynstr_cat_str(string, "null");
            break;
    }
}

// JSON SERIALIZATION IMPLEMENTATION
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// TODO: Se pa que da pra dar uma refatorada nessa func reduzindo um pouco a quatidade de código repetido
// TODO: Se pa que seria util essa func retornar um unsigned int com o número de buffers utilizados
// TODO: Refazer essa func do zero
void bj_write_strings(bj_value *value, char *buffers[], unsigned int size, unsigned int count)
{
    int current_buffer = 0;
    int buffer_iterator = 0; // Iterator to walk in the current buffer

    if (value->type == BJ_OBJECT || value->type == BJ_ARRAY)
    {
        bj_value_stack *nested_values = bj_value_stack_create();
        int nested_depth = 0;

        // TODO: Procurar um jeito de tirar essa parte repetida de código que tem nesses dois blocos aqui em baixo, tanto o de stack quanto o de print

        // Push the root value and it's iterator
        {
            bj_value *value_iterator = bj_value_create(); // GAMBIARRA: Iterator that stores how many values were already written from each Object or Array
            bj_value_set_as_int(value_iterator, 0);

            bj_value_stack_push(nested_values, value);
            bj_value_stack_push(nested_values, value_iterator);

            nested_depth++;
        }

        // Print the start of the root Object or Array
        {
            bj_dynstr *string = bj_dynstr_create(BJ_DYNSTR_INITIAL_SIZE);

            // Add the opening of the Object or Array
            if (value->type == BJ_OBJECT)
                bj_dynstr_cat_str(string, "{\n");
            else
                bj_dynstr_cat_str(string, "[\n");

            bj_dynstr_dump_to_buffers(string, &current_buffer, &buffer_iterator, buffers, size, count);

            bj_dynstr_destroy(string);
        }

        while (!bj_value_stack_is_empty(nested_values))
        {
            bj_value *top_value = nested_values->top->link->value;
            bj_value *top_value_iterator = bj_value_stack_peek(nested_values);

            // Step to the next value in the list using the iterator
            bj_value_list_node *node = (top_value->type == BJ_OBJECT) ? top_value->value.object->values->start : top_value->value.array->values->start;
            for (int i = 0; node != NULL && i < bj_value_get_as_int(top_value_iterator); i++)
                node = node->next;

            for (; node != NULL; node = node->next)
            {
                // Increment the current iterator as we walk trough the values
                top_value_iterator->value.number++;

                if (node->value->type == BJ_OBJECT || node->value->type == BJ_ARRAY)
                {
                    // Print the start of the Object or Array
                    {
                        bj_dynstr *string = bj_dynstr_create(BJ_DYNSTR_INITIAL_SIZE);

                        // Add the tabs
                        for (int tab_count = 0; tab_count < nested_depth; tab_count++)
                        {
                            for (int space_count = 0; space_count < BJ_WRITE_TAB_SIZE; space_count++)
                                bj_dynstr_cat_str(string, " ");
                        }

                        // Add the name
                        if (top_value->type == BJ_OBJECT)
                        {
                            bj_dynstr *name_string = bj_dynstr_create(BJ_DYNSTR_INITIAL_SIZE);
                            bj_dynstr_cat_str(name_string, node->value->name);

                            // Change the escape chars to their string representation, for example: '\n' -> "\\n"
                            bj_dynstr_convert_escape_chars(name_string);

                            bj_dynstr_cat_str(string, "\"");
                            bj_dynstr_cat_dynstr(string, name_string);
                            bj_dynstr_cat_str(string, "\": ");
                        }

                        // Add the opening of the Object or Array
                        if (node->value->type == BJ_OBJECT)
                            bj_dynstr_cat_str(string, "{\n");
                        else
                            bj_dynstr_cat_str(string, "[\n");

                        bj_dynstr_dump_to_buffers(string, &current_buffer, &buffer_iterator, buffers, size, count);

                        bj_dynstr_destroy(string);
                    }

                    // Push the value and it's iterator
                    {
                        bj_value *value_iterator = bj_value_create();
                        bj_value_set_as_int(value_iterator, 0);

                        bj_value_stack_push(nested_values, node->value);
                        bj_value_stack_push(nested_values, value_iterator);

                        nested_depth++;
                    }

                    break; // Break the loop to go inside the found nested value
                }
                else // Print the Thing
                {
                    bj_dynstr *string = bj_dynstr_create(BJ_DYNSTR_INITIAL_SIZE);

                    // Add the tabs
                    for (int tab_count = 0; tab_count < nested_depth; tab_count++)
                    {
                        for (int space_count = 0; space_count < BJ_WRITE_TAB_SIZE; space_count++)
                            bj_dynstr_cat_str(string, " ");
                    }

                    // Add the name
                    if (top_value->type == BJ_OBJECT)
                    {
                        bj_dynstr *name_string = bj_dynstr_create(BJ_DYNSTR_INITIAL_SIZE);
                        bj_dynstr_cat_str(name_string, node->value->name);

                        // Change the escape chars to their string representation, for example: '\n' -> "\\n"
                        bj_dynstr_convert_escape_chars(name_string);

                        bj_dynstr_cat_str(string, "\"");
                        bj_dynstr_cat_dynstr(string, name_string);
                        bj_dynstr_cat_str(string, "\": ");
                    }

                    bj_dynstr_cat_value(string, node->value);

                    if (node->next != NULL)
                        bj_dynstr_cat_str(string, ",");

                    bj_dynstr_cat_str(string, "\n");

                    bj_dynstr_dump_to_buffers(string, &current_buffer, &buffer_iterator, buffers, size, count);

                    bj_dynstr_destroy(string);
                }
            }

            if (node == NULL)
            {
                nested_depth--;

                // Print the end of the Object or Array
                {
                    bj_dynstr *string = bj_dynstr_create(BJ_DYNSTR_INITIAL_SIZE);

                    // Add the tabs
                    for (int tab_count = 0; tab_count < nested_depth; tab_count++)
                    {
                        for (int space_count = 0; space_count < BJ_WRITE_TAB_SIZE; space_count++)
                            bj_dynstr_cat_str(string, " ");
                    }

                    // Add the closing of the Object or Array
                    if (top_value->type == BJ_OBJECT)
                        bj_dynstr_cat_str(string, "}");
                    else
                        bj_dynstr_cat_str(string, "]");

                    if (nested_values->top->link->link != NULL) // If it is not the outer-most value
                    {
                        // Check if it is necessary to add ',' by comparing some funky pointers
                        {
                            bj_value *second_top_value = nested_values->top->link->link->link->value;

                            bj_value_list_node *second_top_value_last_node;
                            if (second_top_value->type == BJ_OBJECT)
                                second_top_value_last_node = second_top_value->value.object->values->start;
                            else
                                second_top_value_last_node = second_top_value->value.array->values->start;

                            for (; second_top_value_last_node->next != NULL; second_top_value_last_node = second_top_value_last_node->next);

                            if (top_value != second_top_value_last_node->value)
                                bj_dynstr_cat_str(string, ",");

                            // It could have been done like this too:
                            // bj_value *second_top_value = nested_values->top->link->link->link->value;
                            // unsigned int list_len;
                            // if (second_top_value->type == BJ_OBJECT)
                            //     list_len = bj_value_list_get_len(second_top_value->value.object->values);
                            // else
                            //     list_len = bj_value_list_get_len(second_top_value->value.array->values);
                            // if (list_len == bj_value_get_as_int(top_value_iterator))
                            //     bj_dynstr_cat_str(string, ",");
                        }

                        bj_dynstr_cat_str(string, "\n");
                    }

                    bj_dynstr_dump_to_buffers(string, &current_buffer, &buffer_iterator, buffers, size, count);

                    bj_dynstr_destroy(string);
                }

                bj_value_destroy(bj_value_stack_pop(nested_values)); // Pop and destroy the iterator
                bj_value_stack_pop(nested_values);                      // Pop the value
            }
        }

        bj_value_stack_destroy(nested_values);
    }
    else // Print the Thing
    {
        bj_dynstr *string = bj_dynstr_create(BJ_DYNSTR_INITIAL_SIZE);
        bj_dynstr_cat_value(string, value);

        bj_dynstr_dump_to_buffers(string, &current_buffer, &buffer_iterator, buffers, size, n);

        bj_dynstr_destroy(string);
    }
}

void bj_write_string(bj_value *value, char *buffer, unsigned int size)
{
    bj_write_strings(value, &buffer, size, 1);
}

void bj_write_file(bj_value *value, const char *path)
{
    FILE *file = fopen(path, "w");

    char *buffers[BJ_FILE_MAX_LINES];
    for (int i = 0; i < BJ_FILE_MAX_LINES; i++)
        buffers[i] = calloc(1, BJ_FILE_MAX_LINE_SIZE);

    bj_write_strings(value, buffers, BJ_FILE_MAX_LINE_SIZE, BJ_FILE_MAX_LINES);

    for (int i = 0; i < BJ_FILE_MAX_LINES; i++)
    {
        fputs(buffers[i], file);
        fflush(file); // TODO: To tendo que dar flush porque aparentemente o buffer de IO ta enchendo e não ta printando o arquivo inteiro, tentar resolver isso de um jeito melhor

        free(buffers[i]);
    }
}
*/

#endif // #ifdef BJ_IMPLEMENTATION
